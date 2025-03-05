import { generateIdFromEntropySize } from "lucia";
import { db } from "../../db";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await db
      .selectFrom("User")
      .selectAll()
      .where("id", "=", input)
      .executeTakeFirst();
  }),
  getList: publicProcedure.query(async ({ input }) => {
    return await db.selectFrom("User").selectAll().execute();
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        isAdmin: z.boolean(),
      }),
    )
    .query(async ({ input }) => {
      return await db
        .insertInto("User")
        .values({
          id: generateIdFromEntropySize(10),
          username: generateIdFromEntropySize(5),
          name: input.name,
          role: input.isAdmin ? "Admin" : "Member",
          password: generateIdFromEntropySize(5),
        })
        .returningAll()
        .execute();
    }),
});
