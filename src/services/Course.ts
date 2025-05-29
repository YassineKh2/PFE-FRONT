import axios from "axios";

import { CourseStats, CourseType, EnrolledUserType } from "@/types/Courses";

const BACKEND = axios.create({
  baseURL: "http://127.0.0.1:5000/course",
});

export async function SaveCourse(Course: CourseType) {
  const formData = new FormData();

  Object.entries(Course).forEach(([key, value]) => {
    formData.append(key, value as string | Blob);
  });

  const response = await BACKEND.post("", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}

export async function GetCourses() {
  const response: { data: { data: CourseType[] } } = await BACKEND.get("");

  return response.data;
}

export async function GetCourse(id: string) {
  const response: { data: { data: CourseType } } = await BACKEND.get(`/${id}`);

  return response.data;
}

export async function UpdateCourse(id: string, Course: CourseType) {
  const formData = new FormData();

  Object.entries(Course).forEach(([key, value]) => {
    formData.append(key, value as string | Blob);
  });
  const response = await BACKEND.post(`/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}
export async function DeleteCourse(id: string) {
  const response = await BACKEND.delete(`/${id}`);

  return response;
}

export async function GetCourseStats(id: string) {
  const response: { data: { data: [CourseStats] } } = await BACKEND.get(
    `/stats/${id}`,
  );

  return response.data;
}

export async function GetEnrolledStudents(id: string) {
  const response: { data: [{ students: EnrolledUserType[] }] } =
    await BACKEND.get(`/enrolled/${id}`);

  return response.data;
}
