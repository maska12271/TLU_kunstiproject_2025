import { db } from "../../db";
import { router, adminProcedure } from "../trpc";
import { z } from "zod";

export const projectRouter = router({
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
        .selectFrom("Project")
        .select(["id", "name", "isActive"])
        .offset(offset)
        .limit(input.perPage)
        .execute();
    }),
});
