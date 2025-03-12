import { generateIdFromEntropySize } from "lucia";
import { db } from "../../db";
import { router, adminProcedure, authedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { DB } from "../../db/schema";
import bcrypt from "bcrypt";
import { lucia } from "../auth";

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
          "Project.name",
          "Project.id",
        ])
        .where("id", "=", input.id)
        .executeTakeFirst();

      const result = await db
        .selectFrom("Post")
        .where("authorId", "=", input.id)
        .select(({ fn }) => fn.countAll().as("count"))
        .executeTakeFirst();

      return {
        ...user,
        postsCount: result?.count || 0,
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
      return await db
        .selectFrom("User")
        .select(["id", "name", "username", "role", "projectId"])
        .offset(offset)
        .limit(input.perPage)
        .execute();
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
      return await db
        .insertInto("User")
        .values({
          id: generateIdFromEntropySize(10),
          username: generateIdFromEntropySize(5),
          name: input.name,
          role: input.isAdmin ? "Admin" : "Member",
          password: generateIdFromEntropySize(5),
          salt: bcrypt.genSaltSync(10),
          projectId: input.projectId || undefined,
        })
        .returning(["id", "name", "username", "role", "projectId"])
        .execute();
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
      return;
    }),
  login: adminProcedure
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

      if (user.password !== bcrypt.hashSync(input.password, user.salt)) {
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
