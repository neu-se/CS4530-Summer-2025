import { getCollection } from "astro:content";

const pages = await getCollection("pages");
export type Page = (typeof pages)[number];

// Find the single default home page
const homePages = pages.filter((page) => page.data.type === "home");
if (homePages.length !== 1) {
  throw new Error(`Expected 1 'home' type page, found ${homePages.length}`);
}
export const homePage: Page = homePages[0]!;

export const contentPages: Page[] = pages.filter(
  (page) => page.data.type !== "home"
);

export const sectionHierarchy = createOrderedSectionHierarchy(
  contentPages.filter((page) => {
    if (page.data.type !== "basic") return true;
    if (page.data.nav_exclude === undefined) {
      return page.id.split("/").length <= 2;
    }
    return !page.data.nav_exclude;
  })
);

function defaultTitle(id: string) {
  return id
    .split("-")
    .map((str) => `${str[0]?.toUpperCase()}${str.slice(1)}`)
    .join(" ");
}

export const extraDirectoryPages: Page[] = sectionHierarchy.flatMap((page) =>
  page.page
    ? []
    : [
        {
          id: page.path,
          data: {
            type: "directory",
            nav_order: 0,
            title: defaultTitle(page.path),
          },
          collection: "pages",
        },
      ]
);

/**
 * Given pages returned from getCollection, return a two-level hierarchy,
 * grouping the pages /foo/bar, /foo/baz, and /foo/etc underneath the
 * page /foo (if a page /foo exists).
 *
 * WARNING: currently, if there are non-excluded pages like /foo/bar and
 * there's no /foo page, there will still be a link to /foo which will result
 * in a 404 error.
 *
 * @param pages Arbitrarily-ordered pages returned from getCollection
 */
function createOrderedSectionHierarchy(pages: Page[]): {
  path: string;
  title: string;
  page: null | Page;
  subPages: null | { path: string; title: string; page: Page }[];
}[] {
  const sectionMap: {
    [section: string]: {
      path: string;
      nav_order?: number | undefined;
      title: string;
      page: null | Page;
      subPages: null | { path: string; title: string; page: Page }[];
    };
  } = {};
  for (const page of pages) {
    // Get the top-level path and ensure it exists
    const [first_, ...rest] = page.id.split("/");
    const first = first_!; // First split always exists
    if (!sectionMap[first]) {
      // Create a top-level hierarchy item with default values
      sectionMap[first] = {
        path: first,
        page: null,
        title: first.replace(/^[a-z]/, (ch) => ch.toUpperCase()),
        subPages: null,
      };
    }
    const section = sectionMap[first]!; // If-statement ensured this exists

    if (rest.length === 0) {
      section.nav_order = page.data.nav_order;
      section.page = page;
      section.title = page.data.title;
    } else {
      const title =
        page.data.type === "module"
          ? `${page.data.nav_order} - ${page.data.title}`
          : page.data.title;
      if (section.subPages === null) {
        section.subPages = [{ path: page.id, title, page }];
      } else {
        section.subPages.push({ path: page.id, title, page });
      }
    }
  }

  /* Finally, appropriately order the sections and subsections */
  return [
    ...Object.values(sectionMap),
    {
      path: "modules",
      title: "Modules",
      nav_order: 10,
      subPages: null,
    },
  ]
    .map((section) => {
      if (section.subPages !== null) {
        section.subPages.sort(sortByNavOrderThenPath);
      }
      return section;
    })
    .toSorted(sortByNavOrderThenPath);
}

/**
 * Sorting function for a record with a path and a (possible) page. Where
 * the page exists and has a nav_order property, that will be used; in all
 * other cases, the nav_order will be treated as Infinity and the path will
 * be used to order navigation pages.
 */
function sortByNavOrderThenPath(
  a: { path: string; page: null | Page, nav_order?: number },
  b: { path: string; page: null | Page, nav_order?: number }
): number {
  const navA = a.page?.data.nav_order ?? a.nav_order ?? Infinity;
  const navB = b.page?.data.nav_order ?? b.nav_order ?? Infinity;
  return navA < navB
    ? -1
    : navA > navB
    ? 1
    : a.path < b.path
    ? -1
    : a.path > b.path
    ? 1
    : 0;
}
