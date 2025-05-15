import { Course, Chapter, CourseState } from "@/schemas/Courses";
import { z } from "zod";

export type CourseType = z.infer<typeof Course>;
export type ChapterType = z.infer<typeof Chapter>;
export type CourseStateType = z.infer<typeof CourseState>;

export type ProgressType = {
  courseId: string;
  progress: number;
  currentChapter: string;
};
