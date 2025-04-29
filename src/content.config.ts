import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

export type PageData = z.infer<typeof zPageData>;
const zPageData = z.object({
  type: z.literal("page"),
  title: z.string(),
  nav_exclude: z.optional(z.boolean()),
  nav_order: z.optional(z.number()),
});

export type DirectoryData = z.infer<typeof zDirectoryData>;
const zDirectoryData = z.object({
  type: z.literal("directory"),
  title: z.string(),
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
      type: z.literal("calendar"),
      title: z.string(),
      nav_order: z.optional(z.number()),
      start: z.date(),
      calendar: z.any(),
    }),
    zPageData,
    z.object({
      type: z.literal("module"),
      title: z.string(),
      nav_order: z.optional(z.number()),
    }),
    zDirectoryData,
  ]),
});

export const collections = { pages };
