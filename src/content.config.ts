import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const pages = defineCollection({
  loader: glob({ pattern: "**/*.(md|mdx)", base: "./pages" }),
  schema: z.discriminatedUnion("layout", [
    z.object({ layout: z.literal("home"), title: z.string() }),
    z.object({ layout: z.literal("schedule"), title: z.string() }),
    z.object({
      layout: z.literal("page"),
      title: z.string(),
      nav_exclude: z.optional(z.literal(true)),
      nav_order: z.optional(z.number()),
    }),
    z.object({
      layout: z.literal("module"),
      title: z.string(),
      nav_order: z.optional(z.number()),
    }),
  ]),
});

export const collections = { pages };
