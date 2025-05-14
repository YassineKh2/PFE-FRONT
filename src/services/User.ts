import { CourseStateType } from "@/types/Courses";
import axios from "axios";

const BACKEND = axios.create({
  baseURL: "http://127.0.0.1:5000/user",
});



export async function Enroll(id:string,CourseState:CourseStateType) {
    const response:{data:{data:string}} = await BACKEND.post('/enroll/'+id,CourseState);
    return response.data;
}



