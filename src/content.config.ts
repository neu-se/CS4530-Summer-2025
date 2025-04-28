import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const pages = defineCollection({
  loader: glob({ pattern: "**/*.(md|mdx)", base: "./pages" }),
  schema: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("home"),
      title: z.string(),
      nav_order: z.optional(z.number()),
    }),
    z.object({
      type: z.literal("schedule"),
      title: z.string(),
      nav_order: z.optional(z.number()),
    }),
    z.object({
      type: z.literal("page"),
      title: z.string(),
      nav_exclude: z.optional(z.literal(true)),
      "nav_order": z.optional(z.number()),
    }),
    z.object({
      type: z.literal("module"),
      title: z.string(),
      nav_order: z.optional(z.number()),
    }),
  ]),
});

export const collections = { pages };
