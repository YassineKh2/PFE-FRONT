import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { subtitle, title } from "@/components/primitives";
import DashboardLayout from "@/layouts/dashboard";
import { GetCourse } from "@/services/Course";
import EditCourseForm from "@/components/Courses/EditCourseForm";
import { CourseType as Course } from "@/types/Courses";

export default function EditCourse() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course>();

  useEffect(() => {
    async function fetchCourse() {
      if (id) {
        const fetchedCourse = await GetCourse(id);
        let data = fetchedCourse.data
        data.id = id;
        setCourse(data);
      }
    }
    fetchCourse();
  }, [id]);


  return (
    <DashboardLayout>
      <h1 className={title({ size: "sm" })}>Courses</h1>
      <div className={subtitle({ size: "xs" }) + " text-gray-400"}>Edit course</div>
      {course ? ( <EditCourseForm course={course} />) : (<div>Loading...</div>) }
    </DashboardLayout>
  );
}
