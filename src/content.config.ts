import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

export type AssignmentData = z.infer<typeof zAssignmentData>;
const zAssignmentData = z.object({
  type: z.literal("assignment"),
  title: z.string(),
  deadline: z.date(),
  nav_exclude: z.optional(z.boolean()),
  nav_order: z.optional(z.number()),
});

export type BasicData = z.infer<typeof zBasicData>;
const zBasicData = z.object({
  type: z.literal("basic"),
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

export type LectureData = z.infer<typeof zLectureData>;
const zLectureData = z.object({
  type: z.literal("lecture"),
  title: z.string(),
  nav_order: z.optional(z.number()),
  lessons: z.optional(z.array(z.string())),
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
    zAssignmentData,
    zBasicData,
    zLectureData,
    zDirectoryData,
  ]),
});

const modules = defineCollection({
  loader: glob({ pattern: "**/*.(md|mdx)", base: "./modules" }),
  schema: z.object({
    title: z.string(),
    lessons: z
      .array(
        z
          .object({
            title: z.optional(z.string()),
            goals: z.optional(z.array(z.string())),
          })
          .nullable()
      )
      .optional(),
  }),
});

export const collections = { pages, modules };
