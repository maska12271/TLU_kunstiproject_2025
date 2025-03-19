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

      const projects = await db
        .selectFrom("Project")
        .select(["id", "name", "isActive"])
        .offset(offset)
        .limit(input.perPage)
        .execute();

      const totalRows = await db
        .selectFrom("User")
        .select(db.fn.countAll().as("totalRows"))
        .executeTakeFirstOrThrow();

      return {
        projects: projects,
        totalPages: Math.ceil((totalRows.totalRows as number) / input.perPage),
      };
    }),
});
