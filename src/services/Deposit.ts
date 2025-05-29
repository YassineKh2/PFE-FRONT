import axios from "axios";

import { Deposit } from "@/types/Deposit";

const BACKEND = axios.create({
  baseURL: "http://127.0.0.1:5000/deposit",
});

export async function SaveDeposit(id: string, Deposit: Deposit) {
  const formData = new FormData();

  Object.entries(Deposit).forEach(([key, value]) => {
    if (key === "nomineeDetails" || key === "uploadedDocuments") {
      formData.append(key, JSON.stringify(value));

      return;
    }

    if (key === "attachedFiles") {
      const files = value as Record<string, File>; 

      Object.entries(files).forEach(([fieldName, file]) => {
        formData.append(fieldName, file);
      });

      return;
    }

    formData.append(key, value as string | Blob);
  });

  const response = await BACKEND.post("/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}
