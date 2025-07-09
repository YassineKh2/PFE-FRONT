import axios from "axios";

import { Log } from "@/types/Log";

const BACKEND = axios.create({
  baseURL: "http://127.0.0.1:5000/logs",
});

export async function GetLogs(id: string) {
  const response: { data: Log[] } = await BACKEND.get("/" + id);

  return response.data;
}
