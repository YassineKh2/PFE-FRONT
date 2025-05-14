import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { subtitle, title } from "@/components/primitives";
import DashboardLayout from "@/layouts/dashboard";
import { GetCourse } from "@/services/Course";
import { CourseType as Course } from "@/types/Courses";
import CourseDetails from "@/components/Courses/CourseDetails";

export default function ViewCourse() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course>();

  useEffect(() => {
    async function fetchCourse() {
      if (!id) return;
      const fetchedCourse = await GetCourse(id);
      let data = fetchedCourse.data;
      data.id = id;
      setCourse(data);
    }
    fetchCourse();
  }, [id]);

  return (
    <DashboardLayout>
      <h1 className={title({ size: "sm", boldness: "bold" })}>Courses</h1>
      <div className={subtitle({ size: "xs" }) + " text-gray-400"}>
        Here you can find all the details about the course
      </div>
      {course ? <CourseDetails course={course} /> : <div>Loading...</div>}
    </DashboardLayout>
  );
}
