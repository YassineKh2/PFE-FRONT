import { useEffect, useState } from "react";

import Filter from "@/components/Chapters/Frontend/Filter";
import FilterdCourses from "@/components/Chapters/Frontend/FilterdCourses";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { GetCourses } from "@/services/Course";
import { CourseType } from "@/types/Courses";

function Courses() {
  const [filters, setFilters] = useState<{
    categories: string[];
    levels: string[];
    durations: string[];
    instructors: string[];
  }>({
    categories: [],
    levels: [],
    durations: [],
    instructors: [],
  });
  const [Courses, setCourses] = useState<CourseType[]>([] as CourseType[]);

  useEffect(() => {
    GetCourses().then((response) => {
      setCourses(response.data);
    });
  }, []);

  if (!Courses) return <h1>Loading ...</h1>;

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="self-start">
          <h1 className={title({ size: "sm", boldness: "bold" })}>
            All Courses
          </h1>
          <p className="text-gray-500 w-full">
            Discover courses to enhance your skills and knowledge
          </p>
        </div>
        <div className="flex justify-between w-full gap-6">
          <Filter setFilters={setFilters} />
          <FilterdCourses Courses={Courses} />
        </div>
      </section>
    </DefaultLayout>
  );
}

export default Courses;
