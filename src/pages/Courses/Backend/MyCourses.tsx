import { Input } from "@heroui/input";
import { useEffect, useState } from "react";

import FilterdCourses from "@/components/Chapters/Frontend/FilterdCourses";
import Cards from "@/components/Courses/Cards";
import { SearchIcon } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import DashboardLayout from "@/layouts/dashboard";
import { useAuth } from "@/providers/AuthProvider";
import { GetCourses } from "@/services/User";
import { CourseType } from "@/types/Courses";
import UpcomingCourses from "@/components/Courses/UpcomingCourses";
import RecentActivity from "@/components/Courses/RecentActivity";

function MyCourses() {
  const [Courses, setCourses] = useState<CourseType[]>([] as CourseType[]);
  const [SearchTerm, setSearchTerm] = useState<string>();
  const { currentUser } = useAuth();

  useEffect(() => {
    GetCourses(currentUser.uid).then((response) => {
      setCourses(response.data);
    });
  }, []);

  // Filter courses based on SearchTerm
  const filteredCourses = SearchTerm
    ? Courses.filter((course) =>
        course.title?.toLowerCase().includes(SearchTerm.toLowerCase()),
      )
    : Courses;

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <div>
          <h1 className={title({ size: "sm", boldness: "bold" })}>
            My Courses
          </h1>

          <p className={subtitle({ size: "xs" }) + " text-gray-400"}>
            Manage and track your course progress
          </p>
        </div>

        <Input
          aria-label="Search"
          className="max-w-xs"
          labelPlacement="outside"
          placeholder="Search courses..."
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="search"
          variant="bordered"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-full gap-12 mt-8 lg:mt-0">
        <Cards id={currentUser.uid} />
        <div className="flex flex-col xl:flex-row w-full gap-6">
          <div className="xl:w-[80%]">
            <FilterdCourses InDashboard Courses={filteredCourses} />
          </div>
          <div className="xl:w-[50%] space-y-4">
            <UpcomingCourses />
            <RecentActivity id={currentUser.uid} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default MyCourses;
