import axios from "axios";

import {
  CourseStateType,
  CourseType,
  OverAllUserStats,
  ProgressType,
  RecentActivity,
} from "@/types/Courses";
import { SystemPoints, User } from "@/types/User";
import { onbordingType } from "@/types/Onbording";

const BACKEND = axios.create({
  baseURL: "http://127.0.0.1:5000/user",
});

export async function Enroll(id: string, CourseState: CourseStateType) {
  const response: { data: { data: string } } = await BACKEND.post(
    "/enroll/" + id,
    CourseState,
  );

  return response.data;
}

export async function GetCourses(id: string) {
  const response: { data: { data: CourseType[] } } = await BACKEND.get(
    "/enroll/" + id,
  );

  return response.data;
}

export async function GetCoursesState(id: string) {
  const response: { data: { data: { id: CourseStateType[] } } } =
    await BACKEND.get("/courses/" + id);

  return response.data;
}

export async function GetProgress(id: string) {
  const response: { data: { data: [] } } = await BACKEND.get("/progress/" + id);

  return response.data;
}

export async function UpdateProgress(
  id: string,
  progress: { courseId: string; chapterId: string },
) {
  const response: { data: { data: [] } } = await BACKEND.post(
    "/progress/" + id,
    progress,
  );

  return response.data;
}

export async function GetSingleProgress(id: string, courseid: string) {
  const response: { data: { data: ProgressType } } = await BACKEND.get(
    "/progress/single/" + id + "/" + courseid,
  );

  return response.data;
}

export async function GetOverAllProgress(id: string) {
  const response: { data: { data: [OverAllUserStats] } } = await BACKEND.get(
    "/progress/overall/" + id,
  );

  return response.data;
}

export async function GetRecentActivity(id: string) {
  const response: { data: { data: [[RecentActivity]] } } = await BACKEND.get(
    "/activity/" + id,
  );

  return response.data;
}

export async function GetAll() {
  const response: { data: [User[]] } = await BACKEND.get("/all");

  return response.data;
}

export async function UpdatePreferences(
  id: string,
  preferences: onbordingType,
) {
  const response: { data: {} } = await BACKEND.post(
    "/preferences/" + id,
    preferences,
  );

  return response.data;
}

export async function GetUserInformation(id: string) {
  const response: { data: User } = await BACKEND.get("/" + id);

  return response.data;
}

export async function UpdateSystemPreferences(
  id: string,
  SystemPoints: SystemPoints,
) {
  const response: { data: {} } = await BACKEND.post(
    "/systempreferences/" + id,
    SystemPoints,
  );

  return response.data;
}

export async function RefuseCourse(id: string) {
  const response: { data: {} } = await BACKEND.post(
    "/systempreferences/refuse/" + id,
  );

  return response.data;
}
