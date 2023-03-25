import { protectedProcedure, publicProcedure } from "./../trpc";
import { createTRPCRouter } from "../trpc";
import { z } from "zod";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
  create: protectedProcedure
    .input(
      z.object({ title: z.string(), content: z.string(), userId: z.string() })
    )
    .mutation(({ ctx, input }) => {
      const post = ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          userId: ctx.session?.user.id,
        },
      });
      return post;
    }),
});
