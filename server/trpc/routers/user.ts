import { generateIdFromEntropySize } from "lucia";
import { db } from "../../db";
import {
  router,
  adminProcedure,
  authedProcedure,
  publicProcedure,
} from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { DB } from "../../db/schema";
import { genSaltSync, hashSync } from "bcrypt";
import { lucia } from "../../util/auth";

export const userRouter = router({
  getById: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const user = await db
        .selectFrom("User")
        .innerJoin("Project", "User.projectId", "Project.id")
        .select([
          "User.id",
          "User.name",
          "User.role",
          "User.username",
          "Project.name as projectName",
          "Project.id as projectId",
        ])
        .where("User.id", "=", input.id)
        .executeTakeFirst();

      if (user == undefined) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return {
        ...user,
      };
    }),
  getList: adminProcedure
    .input(
      z.object({
        pageNo: z.number().positive().default(1),
        perPage: z.number().default(10),
      }),
    )
    .query(async ({ input }) => {
      const offset = (input.pageNo - 1) * input.perPage;

      const users = await db
        .selectFrom("User")
        .select(["id", "name", "username", "role", "projectId"])
        .offset(offset)
        .limit(input.perPage)
        .execute();

      const totalRows = await db
        .selectFrom("User")
        .select(db.fn.countAll().as("totalRows"))
        .executeTakeFirstOrThrow();

      return {
        users: users,
        totalPages: Math.ceil((totalRows.totalRows as number) / input.perPage),
      };
    }),
  create: adminProcedure
    .input(
      z.object({
        name: z.string(),
        isAdmin: z.boolean(),
        projectId: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      // TODO: probably shoud add check if project exists
      const password = generateIdFromEntropySize(10);
      const salt = genSaltSync(10);
      return await db
        .insertInto("User")
        .values({
          id: generateIdFromEntropySize(10),
          username: generateIdFromEntropySize(5),
          name: input.name,
          role: input.isAdmin ? "Admin" : "Member",
          password: hashSync(password, salt),
          salt: salt,
          projectId: input.projectId || undefined,
        })
        .returning(["id", "name", "username", "role", "projectId"])
        .executeTakeFirst();
    }),
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        role: z.custom<DB["User"]["role"]>().optional(),
        projectId: z.string().optional(),
        username: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await db
        .updateTable("User")
        .where("id", "=", input.id)
        .set(input)
        .returning(["id", "name", "username", "role", "projectId"])
        .executeTakeFirst();

      return result;
    }),
  delete: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await db
        .deleteFrom("User")
        .where("id", "=", input.id)
        .execute();
      if (result[0].numDeletedRows == 0n) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return {
        success: true,
      };
    }),
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await db
        .selectFrom("User")
        .select(["id", "name", "password", "salt"])
        .where("username", "=", input.username)
        .executeTakeFirst();

      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (user.password !== hashSync(input.password, user.salt)) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const session = await lucia.createSession(user.id, {
        token: generateIdFromEntropySize(10),
        refreshToken: generateIdFromEntropySize(10),
      });

      const sessionCookie = lucia.createSessionCookie(session.id);
      ctx.res.cookie(sessionCookie.name, sessionCookie.value, {
        path: "/",
        ...sessionCookie.attributes,
      });

      return {
        id: user.id,
        name: user.name,
      };
    }),
  logout: authedProcedure.mutation(async ({ ctx }) => {
    lucia.invalidateSession(ctx.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    ctx.res.cookie(sessionCookie.name, sessionCookie.value, {
      path: "/",
      ...sessionCookie.attributes,
    });

    ctx.res.locals.user = null;
    ctx.res.locals.session = null;
  }),
});
