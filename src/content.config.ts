import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

export type PageData = z.infer<typeof zPageData>;
const zPageData = z.object({
  type: z.literal("page"),
  title: z.string(),
  nav_exclude: z.optional(z.boolean()),
  nav_order: z.optional(z.number()),
});

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
    zPageData,
    z.object({
      type: z.literal("module"),
      title: z.string(),
      nav_order: z.optional(z.number()),
    }),
    z.object({
      type: z.literal("directory"),
      title: z.string(),
      nav_order: z.optional(z.number()),
    }),
  ]),
});

export const collections = { pages };
