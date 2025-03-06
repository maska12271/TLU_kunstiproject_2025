import { generateIdFromEntropySize } from "lucia";
import { db } from "../../db";
import { router, publicProcedure, adminProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

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
        .selectAll()
        .offset(offset)
        .limit(input.perPage)
        .execute();
    }),
  create: adminProcedure
    .input(
      z.object({
        name: z.string(),
        isAdmin: z.boolean(),
        projectId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      // TODO: probably shoud add check if project exists
      return await db
        .insertInto("User")
        .values({
          id: generateIdFromEntropySize(10),
          username: generateIdFromEntropySize(5),
          name: input.name,
          role: input.isAdmin ? "Admin" : "Member",
          password: generateIdFromEntropySize(5),
          projectId: input.projectId,
        })
        .returningAll()
        .execute();
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
});
