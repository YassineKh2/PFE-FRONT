import { ChapterType as Chapter, CourseType as Course } from "@/types/Courses";
import Banner from "./Details/Banner";
import Header from "./Details/Header";
import Content from "./Details/Content";
import EnrolledStudents from "./Details/EnrolledStudents";
import EnrollmentStatistics from "./Details/EnrollmentStatistics";
import Settings from "./Details/Settings";
import { useEffect, useState } from "react";
import { GetChapters } from "@/services/Chapter";

function CourseDetails({ course }: { course: Course }) {

  const [Loading, setLoading] = useState(true);

   const [chapters, setChapters] = useState<Chapter[]>([])
  useEffect(() => {
    const courseId = course.id || "";
    GetChapters(courseId).then((response) => {
      setChapters(response.data);
      setLoading(false);
    })
  },[course])


  return (
    Loading ? (
      <div className="flex justify-center items-center h-full">
        <div className="loader">loading</div>
      </div>
    ) : (
      <div className="flex flex-col gap-4">
        <Banner imageSrc={course.image}/>
        <Header course={course} />
        <section className="flex gap-4">
          <div className="w-[65%] self-start space-y-4">
            <Content id={course.id || ''} chapters={chapters} setChapters={setChapters}/>
            <EnrolledStudents />
          </div>
          <div className="w-[35%] self-start space-y-4">
            <EnrollmentStatistics />
            <Settings />
          </div>
        </section>
      </div>
    )
  );
}

export default CourseDetails;
