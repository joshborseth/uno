import { TRPCError } from "@trpc/server";
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
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.hasPostedToday)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You have already posted today",
        });
      const userToUpdate = await ctx.prisma.user.update({
        where: {
          id: ctx.session?.user.id,
        },
        data: {
          hasPostedToday: true,
        },
      });

      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          userId: ctx.session?.user.id,
        },
      });
      return { post: post, user: userToUpdate };
    }),
});
