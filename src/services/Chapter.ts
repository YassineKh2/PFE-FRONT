import axios from "axios";

import { ChapterType as Chapter } from "@/types/Courses";

const BACKEND = axios.create({
  baseURL: "http://127.0.0.1:5000/chapter",
});

export async function SaveChapter(Chapter: Chapter) {
  const formData = new FormData();

  Object.entries(Chapter).forEach(([key, value]) => {
    if (key === "content") {
      formData.append(key, JSON.stringify(value));

      return;
    }
    formData.append(key, value as string | Blob);
  });

  const response = await BACKEND.post("", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}

export async function GetAllChapters() {
  const response: { data: { data: Chapter[] } } = await BACKEND.get("");

  return response.data;
}

export async function GetChapters(courseId: string) {
  const response: { data: { data: Chapter[] } } = await BACKEND.get(
    `/${courseId}`,
  );

  return response.data;
}

export async function GetChapter(id: string) {
  const response: { data: { data: Chapter } } = await BACKEND.get(
    `/single/${id}`,
  );

  return response.data;
}

export async function UpdateChapter(id: string, Chapter: Chapter) {
  const formData = new FormData();

  Object.entries(Chapter).forEach(([key, value]) => {
    if (key === "content") {
      formData.append(key, JSON.stringify(value));

      return;
    }
    formData.append(key, value as string | Blob);
  });

  const response = await BACKEND.post(`/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}

export async function DeleteChapter(id: string) {
  const response = await BACKEND.delete(`/${id}`);

  return response;
}
