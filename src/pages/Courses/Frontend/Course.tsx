import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
import { GetCourse } from "@/services/Course";
import { GetStaticImages } from "@/services/GetStaticFiles";
import { ChapterType, CourseType } from "@/types/Courses";
import CourseHeader from "@/components/Courses/Frontend/ViewSingleCourse/CourseHeader";
import WhatYouWillLearn from "@/components/Courses/Frontend/ViewSingleCourse/WhatYouWillLearn";
import CourseChapters from "@/components/Courses/Frontend/ViewSingleCourse/CourseChapters";
import InstructorInfo from "@/components/Courses/Frontend/ViewSingleCourse/InstructorInfo";
import CourseSidebar from "@/components/Courses/Frontend/ViewSingleCourse/CourseSidebar";
import { GetChapters } from "@/services/Chapter";

function Course() {
  const [course, setCourse] = useState<CourseType>({} as CourseType);
  const [Chapters, setChapters] = useState<ChapterType[]>([] as ChapterType[]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;
    GetCourse(id).then((response) => {
      setCourse(response.data);
      GetChapters(id).then((response) => {
        setChapters(response.data);
      });
    });
  }, []);

  if (!course && Chapters) return <h1>Loading ...</h1>;

  return (
    <DefaultLayout className="bg-gray-50">
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
        <div className="flex flex-col lg:flex-row justify-between w-full gap-6 items-start">
          <div className="w-full lg:w-[70%] flex flex-col gap-8 ">
            <CourseHeader
              category={course.category}
              description={course.description}
              duration={course.duration}
              image={GetStaticImages(course.image)}
              level={course.level}
              rating={4.7}
              students={452893}
              title={course.title}
            />
            <WhatYouWillLearn />
            <CourseChapters Chapters={Chapters} />
            <InstructorInfo Instructor={course.instructor} />
          </div>
          <CourseSidebar
            duration={course.duration}
            id={id || ""}
            lastUpdated={course.editedAt || "N/A"}
            level={course.level}
            price={69.99}
            students={452893}
          />
        </div>
      </section>
    </DefaultLayout>
  );
}

export default Course;
