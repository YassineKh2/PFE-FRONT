import { useEffect, useState } from "react";
import CourseTable from "./CourseTable";
import { CourseType as Course } from "@/types/Courses";
import { GetCourses } from "@/services/Course";

// --- Main Page Component ---
function AllCourses() {
  const [Courses, setCourses] = useState<Course[]>([] as Course[]);

  useEffect(() => {
    GetCourses().then((response) => {
      setCourses(response.data);
    });
  }, []);

  return (
    <div>
      {Courses && Courses.length > 0 ? (
        <CourseTable courses={Courses} setCourses={setCourses} />
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default AllCourses;
