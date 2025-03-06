import { generateIdFromEntropySize } from "lucia";
import { db } from "../../db";
import { router, publicProcedure, adminProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  getById: adminProcedure.input(z.string()).query(async ({ input }) => {
    return await db
      .selectFrom("User")
      .selectAll()
      .where("id", "=", input)
      .executeTakeFirst();
  }),
  getList: adminProcedure.query(async () => {
    return await db.selectFrom("User").selectAll().execute();
  }),
  create: adminProcedure
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
