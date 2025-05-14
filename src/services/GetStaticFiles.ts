import axios from "axios";

const baseURL = "http://127.0.0.1:5000/static"

const BACKEND = axios.create({
  baseURL: baseURL
});


export function GetStaticImages(path: string) {
  const response = baseURL + "/Images/" + path;
  return response;
}