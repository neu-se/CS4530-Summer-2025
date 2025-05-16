import { getCollection } from "astro:content";
import { readdirSync } from "node:fs";

const modules = await getCollection("modules");
const handouts = readdirSync("./public/handouts");

interface Lesson {
  title: string | undefined;
  goals: string[];
  files: { description: string; extension: string; href: string }[];
}
export const courseOutline: { title?: string; lessons: Lesson[] }[] = [];

for (const { id, data } of modules) {
  const num = parseInt(id, 10);
  if (isNaN(num)) {
    throw new Error("Module filenames must begin with a number");
  }
  courseOutline[num - 1] = {
    title: data.title,
    lessons: (data.lessons ?? []).map((lesson) => ({
      title: lesson?.title,
      goals: lesson?.goals ?? [],
      files: [],
    })),
  };
}

for (const slideFile of handouts) {
  const match = slideFile.match(
    /^([^0-9~]*)([0-9]+)(\.([0-9]+))?([^.]*)\.(.*)$/
  );
  if (!match) continue;
  const [_, handoutType, moduleStr, _d, lessonStr, title, ext] = match;
  if (!moduleStr || !lessonStr || !handoutType || !title || !ext)
    throw new Error("impossible?");
  const moduleNum = parseInt(moduleStr) - 1;
  const lessonNum = parseInt(lessonStr) - 1;

  courseOutline[moduleNum] = courseOutline[moduleNum] ?? {
    lessons: [],
  };
  const lessonData = (courseOutline[moduleNum].lessons[lessonNum] =
    courseOutline[moduleNum].lessons[lessonNum] ?? {
      title: undefined,
      goals: [],
      files: [],
    });
  if (!lessonData.title) lessonData.title = title.trim();
  lessonData.files.push({
    description: handoutType.trim(),
    extension: ext,
    href: `handouts/${slideFile}`,
  });
}
