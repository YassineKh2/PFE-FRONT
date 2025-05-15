import { useState } from "react";
import DashboardLayout from "@/layouts/dashboard";
import { subtitle, title } from "@/components/primitives";
import FilteredCertificates from "@/components/Chapters/Frontend/FilteredCertificates";
import { CourseType } from "@/types/Courses";

function Certificates() {

  const [Courses, setCourses] = useState<CourseType[]>([{
    title: "Node.js Backend Fundamentals",
    description: "Learn the basics of backend development with Node.js, Express, and MongoDB.",
    duration: "8 weeks",
    level: "Beginner",
    category: "Backend",
    image: "/images/courses/nodejs-backend.png",
    status: "published",
    instructor: "Jane Doe",
    endrolledStudents: ["student1", "student2", "student3"],
    visibleToPublic: true,
    opentoenrollement: true,
    studentdisscussions: true,
    emailnotifications: true,
    id: "course-backend-001",
    chapters: ["Introduction", "Express Basics", "MongoDB Integration"],
    createdAt: "2024-06-01T10:00:00Z",
    editedAt: "2024-06-10T15:30:00Z",
    finishedAt:"2024-06-10T15:30:00Z"
  }])



  return (
    <>
      <DashboardLayout>
        <h1 className={title({ size: "sm", boldness: "bold" })}>
          Certificates
        </h1>
        <div className={subtitle({ size: "xs" }) + " text-gray-400"}>
          View and download your earned certificates
        </div>
        <FilteredCertificates Courses={Courses}/>
      </DashboardLayout>
    </>
  );
}

export default Certificates;
