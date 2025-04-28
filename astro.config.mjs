// @ts-check
import { defineConfig, envField } from "astro/config";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  base: "/CS4530-Summer-2025",
  trailingSlash: "never",

  env: {
    schema: {
      COURSE_NUMBER: envField.string({ context: "server", access: "public" }),
      COURSE_TITLE: envField.string({ context: "server", access: "public" }),
      SEMESTER: envField.string({ context: "server", access: "public" }),
      FACULTY: envField.string({ context: "server", access: "public" }),
      INSTITUTION: envField.string({ context: "server", access: "public" }),
    },
  },

  experimental: {
    responsiveImages: true,
  },

  image: {
    experimentalLayout: "responsive",
  },

  integrations: [mdx()],
});
