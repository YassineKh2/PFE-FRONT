import { useEffect, useState } from "react";

import Banner from "./Details/Banner";
import Header from "./Details/Header";
import Content from "./Details/Content";
import EnrolledStudents from "./Details/EnrolledStudents";
import EnrollmentStatistics from "./Details/EnrollmentStatistics";
import Settings from "./Details/Settings";

import { ChapterType as Chapter, CourseType as Course } from "@/types/Courses";
import { GetChapters } from "@/services/Chapter";

function CourseDetails({ course }: { course: Course }) {
  const [Loading, setLoading] = useState(true);

  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    const courseId = course.id || "";

    GetChapters(courseId).then((response) => {
      setChapters(response.data);
      setLoading(false);
    });
  }, [course]);

  return Loading ? (
    <div className="flex justify-center items-center h-full">
      <div className="loader">loading</div>
    </div>
  ) : (
    <div className="flex flex-col gap-4">
      <Banner imageSrc={course.image} />
      <Header course={course} />
      <section className="flex flex-col xl:flex-row gap-4">
        <div className="w-full xl:w-[65%] self-start space-y-4">
          <Content
            chapters={chapters}
            id={course.id || ""}
            setChapters={setChapters}
          />
          <EnrolledStudents id={course.id || ""} />
        </div>
        <div className="w-full xl:w-[35%] self-start space-y-4">
          <EnrollmentStatistics id={course.id} />
          <Settings />
        </div>
      </section>
    </div>
  );
}

export default CourseDetails;
