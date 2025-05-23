import axios from "axios";

import { Quiz } from "@/types/Courses";

const BACKEND = axios.create({
  baseURL: "http://127.0.0.1:5000/quiz",
});


export async function GetQuizzes(id: string) {
  const response: { data: [Quiz] } = await BACKEND.get("/" + id);

  return response;
}
