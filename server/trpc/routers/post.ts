import { generateIdFromEntropySize } from "lucia";
import { db } from "../../db";
import { router, adminProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { DB } from "../../db/schema";
import { Selectable } from "kysely";

export const userRouter = router({
  getById: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const post = await db
        .selectFrom("Post")
        .innerJoin("User", "Post.authorId", "User.id")
        .select(["Post.id", "Post.title", "Post.description", "User.name"])
        .where("id", "=", input.id)
        .executeTakeFirst();

      if (post == undefined) {
        return new TRPCError({ code: "NOT_FOUND" });
      }

      const images = await db
        .selectFrom("Image")
        .select(["url", "alt", "type"])
        .where("postId", "=", post.id)
        .execute();

      return {
        ...post,
        images: images,
      };
    }),
  getList: adminProcedure
    .input(
      z.object({
        pageNo: z.number().positive().default(1),
        perPage: z.number().default(10),
        includeImages: z.boolean().default(false),
      }),
    )
    .query(async ({ input }) => {
      const offset = (input.pageNo - 1) * input.perPage;

      const posts = await db
        .selectFrom("Post")
        .innerJoin("User", "Post.authorId", "User.id")
        .select(["Post.id", "Post.title", "Post.description", "User.name"])
        .offset(offset)
        .limit(input.perPage)
        .execute();

      if (posts == undefined) {
        return new TRPCError({ code: "NOT_FOUND" });
      }

      const postsWithImages: {
        id: Selectable<DB["Post"]>["id"];
        title: Selectable<DB["Post"]>["title"];
        description: Selectable<DB["Post"]>["description"];
        name: Selectable<DB["User"]>["name"];
        images: {
          type: Selectable<DB["Image"]>["type"];
          url: Selectable<DB["Image"]>["url"];
          alt: Selectable<DB["Image"]>["alt"];
        }[];
      }[] = [];

      if (input.includeImages) {
        for (let i = 0; i < posts.length; i++) {
          const element = posts[i];
          const images = await db
            .selectFrom("Image")
            .select(["url", "alt", "type"])
            .where("postId", "=", element.id)
            .execute();
          postsWithImages[i] = {
            ...element,
            images: images,
          };
        }
        return postsWithImages;
      } else {
        return posts;
      }
    }),
  create: adminProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const post = await db
        .insertInto("Post")
        .values({
          id: generateIdFromEntropySize(10),
          title: input.title,
          description: input.description,
          authorId: ctx.user.id,
        })
        .returning(["id", "title", "description"])
        .executeTakeFirst();
      return post;
    }),
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await db
        .updateTable("Post")
        .where("id", "=", input.id)
        .set(input)
        .returning(["id", "title", "description"])
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
        .deleteFrom("Post")
        .where("id", "=", input.id)
        .execute();
      if (result[0].numDeletedRows == 0n) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return;
    }),
});
