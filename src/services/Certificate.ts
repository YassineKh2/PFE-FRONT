import axios from "axios";

import { CertificateType } from "@/types/Courses";

const BACKEND = axios.create({
  baseURL: "http://127.0.0.1:5000/certificate",
});

export async function AddCertificate(data: CertificateType) {
  const response: { data: { data: {} } } = await BACKEND.post("", data);

  return response;
}

export async function GetMyCertificates(id: string) {
  const response: { data: { data: CertificateType[] } } = await BACKEND.get(
    "/mine/" + id,
  );

  return response;
}

export async function GetCertificate(id: string) {
  const response: { data: CertificateType } = await BACKEND.get("/" + id);

  return response;
}
