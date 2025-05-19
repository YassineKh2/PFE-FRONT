import { EnrolledCourse } from "./Courses";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  enrolledCourses: {
    [courseId: string]: EnrolledCourse;
  };
};
