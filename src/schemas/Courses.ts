import { z } from "zod";

export const Course = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Course name is required"),
  description: z.string().min(1, "Course description is required"),
  duration: z.string(),
  level: z.string().min(1, "Course level is required"),
  category: z.string().min(1, "Course category is required"),
  image: z.string().min(1, "Invalid URL format for course image"),
  status: z.enum(["published", "draft", "archived"]),
  instructor: z.string().min(1, "Instructor name is required"),
  chapters: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  editedAt: z.string().optional(),
  endrolledStudents:z.array(z.string()).default([]),
  visibleToPublic:z.boolean().default(true),
  opentoenrollement:z.boolean().default(true),
  studentdisscussions:z.boolean().default(true),
  emailnotifications:z.boolean().default(true),
});

export const Chapter = z.object({
  id: z.string().optional(),
  order: z.string().min(1, "Order is required"),
  title: z.string().min(1, "Chapter name is required"),
  description: z.string().min(1, "Chapter description is required"),
  duration: z.string().min(1, "Chapter duration is required"),
  courseId: z.string().min(1, "Course ID is required"),
  image: z.string().min(1, "Invalid URL format for course image"),
  enrolledStudents: z.array(z.string()).optional(),
  content: z.object({}).optional(),
  createdAt: z.string().optional(),
  editedAt: z.string().optional(),
});

export const CourseState = z.object({
  courseId : z.string(),
  completedChapters:z.array(z.string()),
  progress:z.number(),
  enrolledAt:z.string(),
  lastActive:z.string()
})
