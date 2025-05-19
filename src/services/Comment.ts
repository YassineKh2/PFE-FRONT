import axios from "axios";

import { Comment } from "@/types/Courses";

const BACKEND = axios.create({
  baseURL: "http://127.0.0.1:5000/comment",
});

export async function PostComment(comment: Comment) {
  const response: { data: { data: string } } = await BACKEND.post("", comment);

  return response.data;
}

export async function GetAllComments() {
  const response: { data: { data: Comment[] } } = await BACKEND.get("");

  return response.data;
}

export async function GetComments(id: string) {
  const response: { data: [{ data: Comment[] }] } = await BACKEND.get("/" + id);

  return response.data;
}

export async function UpdateComment(id: string, comment: Comment) {
  const response: { data: { data: string } } = await BACKEND.post(
    "/" + id,
    comment,
  );

  return response.data;
}
