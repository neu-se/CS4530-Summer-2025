# CS4530, Summer 2025: Fundamentals of Software Engineering

This repository contains the source for the website for Northeastern's CS4530, Summer 2025 class. If you are looking to browse the site, you should visit it directly, at [https://neu-se.github.io/CS4530-Summer-2025/](https://neu-se.github.io/CS4530-Summer-2025/). If you are looking to edit the site, then you have come to the right place!

### Websites for prior versions of this class:

- [Spring 2025](https://neu-se.github.io/CS4530-Spring-2025)
- [Fall 2024](https://neu-se.github.io/CS4530-Fall-2024)
- [Spring 2024](https://neu-se.github.io/CS4530-Spring-2024)
- [Fall 2023](https://neu-se.github.io/CS4530-Fall-2023)
- [Spring 2023](https://neu-se.github.io/CS4530-Spring-2023)
- [Fall 2022](https://neu-se.github.io/CS4530-Fall-2022)
- [Spring 2022](https://neu-se.github.io/CS4530-Spring-2022)
- [Fall 2021](https://pages.github.ccs.neu.edu/CS4530-Fall2021/CourseWebSite/)
- [Spring 2021](https://neu-se.github.io/CS4530-CS5500-Spring-2021/)
- [Fall 2020](https://pages.github.ccs.neu.edu/CS5500-CourseMaterials/CS4530-CS5500-Fall2020/)

### License

All materials in this repository (the lectures, assignments, and also the site itself) are released under the [Creative Commons Attribution-ShareAlike 4.0 License](https://creativecommons.org/licenses/by-sa/4.0/). Please feel free to reuse or remix these materials in your class. If you do, we'd love to hear your thoughts.

### About this site

This website is built using [Astro](https://astro.build/), a customizable framework for content-heavy static and dynamic sites (with an emphasis on static site generation). (As of 2025 when I'm creating this, Astro is a stable but currently-trendy toolset. If you're reading this in the future and Astro is an ancient and unmaintainable mess, I'm sorry, it was inevitable, but at least everything's mostly markdown under the hood. - Rob Simmons)

### Local development environment

If you have Node LTS 22 or above, you should be able to go to:

```sh
npm install
npm run dev
```

and then go to the URL that pops up on the command line (probably <http://localhost:4321/CS4530-Summer-2025>).

### 🚀 Project Structure

Inside of the repository, you'll see the following folders and files:

```text
/
├── .github/
├── pages/
│   ├── activities/
│   ├── calendar.md
│   ├── home.md
│   └── tutorials.md
├── public/
│   ├── code
│   │   └── week1-unit-testing
│   │       └── jest-tutorial-starter-code.zip
│   └── slides/
│       └── Lesson 1.1 Course Introduction.pptx
├── src/
│   ├── layouts/
│   └── content.config.js
├── .env
├── astro.config.mjs
└── package.json
```

Here are a couple of the relevant facts:

- Anything in the `public/` directory is placed, unprocessed, on the website. So that zip fill will be at `$PROJECT_ROOT/code/week1-unit-testing/jest-tutorial-starter-code.zip`.
- The `src/` directory, along with the `astro.config.mjs` file, contain all the Astro configuration for the project. In most cases it should not be necessary to touch this configuration unless you're changing the site.
- Each page in the `pages/` directory corresponds to a page on the site (with the same path, minus the `.md` extension). Astro is, in general, big on [file-based routing](https://docs.astro.build/en/basics/astro-pages/#file-based-routing).
- The `.env` file contains site-wide configuration. If you're updating the website for a new semester, or adapting the repository for a new course, you'll need to update the values in this file.
- The `src/` contains all the code for building the site, but hopefully shouldn't need to be messed with too much once it's set up.

### Modules

The website tries to adhere to file-based routing off the `pages/` directory. The big exception are _modules_. The [information architecture](https://en.wikipedia.org/wiki/Information_architecture) of the course looks like this:

 - _Lessons_ are the atomic units of content. Slides and learning goals are associated with lessons.
 - _Lectures_ are the way that lessons are presented temporally. In a multi-section course, different sections can share the same lectures, or use different lectures; each lecture covers some number of lessons.
 - _Modules_ are the "chapters" of a course: thematic collections of lectures with a larger overarching goal. Just like with a textbook, lectures don't have to work through modules in any particular order.

Modules, and the lessons in them, can be either:

 - _Inferred_: the presence of a file `public/slides/Whatever 3.2 Name of Lesson.pptx` will tell the system that there is a module 3 with a lesson 2 titled "Name of Lesson."
 - _Defined_: the presence of a file `modules/03.mdx` will define a sequence of lessons in this module. Lesson titles in this file will override inferred lesson titles.

### Page types

All files in the `pages/` directory have a `title`, an optional `nav_order` number, and an optional `nav_exclude` boolean. The last two control the appearance of the navigation menu.

 - Top-level pages (`pages/*.mdx`) are part of primary navigation and default to `nav_exclude: false`.
 - Second-level pages (`pages/*/*.mdx`) are part of secondary navigation and default to `nav_exclude: false`.
 - Third-or-more level pages are part of secondary navigation but default to `nav_exclude: true`.

There are several page types aside from `type: basic`.

 - There has to be exactly one page with `type: home` somewhere in `pages/`
 - `type: directory` must be a top-level page, and repeats the list of child pages that appear in navigation
 - `type: assignment` comes with a `deadline`, which appears on the calendar
 - `type: lecture` comes with an optional list of `lessons`, `<module>.<lesson>` numbers that are included in the page
 - `type: calendar` describes a course calendar

### Links

The website uses [`<base>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base), which means that all _relative_ links on the site are relative to the root of the project, <https://neu-se.github.io/CS4530-Summer-2025/> or whatever. In general, you should use fully relative links: if you're trying to link to the page specified as `pages/tutorials.md` from anywhere on the site, it should look like `[this](tutorials)`, and if you're trying to link to the `public/code/week1-unit-testing/jest-tutorial-starter-code.zip` file from anywhere on the site, it should look like `[this](code/week1-unit-testing/jest-tutorial-starter-code.zip)`.
