import { z } from "zod";

import { Course, Chapter, CourseState } from "@/schemas/Courses";

export type CourseType = z.infer<typeof Course>;
export type ChapterType = z.infer<typeof Chapter>;
export type CourseStateType = z.infer<typeof CourseState>;

export type ProgressType = {
  courseId: string;
  progress: number;
  currentChapter: string;
};

export type CertificateType = {
  userName: string;
  courseName: string;
  completionDate: string;
  instructorName: string;
  certificateNumber: string;
  courseId: string;
  idUser: string;
  CourseDescription: string;
  courseImage: string;
};

export type OverAllUserStats = {
  averageCompletionRate: number;
  durationThisWeek: number;
  pendingCertificates: number;
  totalCertificates: number;
  totalCompletedChapters: number;
  totalDuration: number;
  totalRemainingChapters: number;
};

export type RecentActivity = {
  name: string;
  time: string;
  type: string;
};

export type CourseStats = {
  averageCompletionTimeHours: number;
  completionRate: number;
  dropoutRate: number;
  enrolledThisMonth: number;
  totalEnrolled: number;
};

export type Comment = {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  replyingTo: string | undefined;
};
