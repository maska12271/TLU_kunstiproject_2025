import { db } from "../../db";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { generateIdFromEntropySize } from "lucia";

export const appRouter = router({
  user: {
    getUserById: publicProcedure.input(z.string()).query(async ({ input }) => {
      return await db
        .selectFrom("User")
        .selectAll()
        .where("id", "=", input)
        .executeTakeFirst();
    }),
    getUserList: publicProcedure.query(async () => {
      return await db.selectFrom("User").selectAll().execute();
    }),
    createUser: publicProcedure
      .input(
        z.object({
          name: z.string(),
          isAdmin: z.boolean(),
        })
      )
      .mutation(async ({ input }) => {
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
  },
});

export type AppRouter = typeof appRouter;
