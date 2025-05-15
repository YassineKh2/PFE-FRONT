import FilterdCourses from "@/components/Chapters/Frontend/FilterdCourses";
import Cards from "@/components/Courses/Cards";
import { SearchIcon } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import DashboardLayout from "@/layouts/dashboard";
import { useAuth } from "@/providers/AuthProvider";
import { GetCourses } from "@/services/User";
import { CourseType } from "@/types/Courses";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

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
        course.title?.toLowerCase().includes(SearchTerm.toLowerCase())
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
          labelPlacement="outside"
          placeholder="Search courses..."
          className="max-w-xs"
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="search"
          variant="bordered"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-full gap-12 mt-8 lg:mt-0">
        <Cards />
        <div className="flex flex-col xl:flex-row w-full gap-6">
          <div className="xl:w-[80%]">
            <FilterdCourses Courses={filteredCourses} InDashboard />
          </div>
          <div className="xl:w-[50%] space-y-4">
            <Card className="p-2">
              <CardHeader>
                <p className="text-xl font-semibold">Upcoming Lessons</p>
              </CardHeader>
              <CardBody className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-md bg-gray-100`}
                    >
                      <Icon icon="lucide:calendar" width={24} />
                    </div>
                    <div className="flex flex-col text-sm">
                      <p className="font-semibold">Advanced Mutual Funds</p>
                      <p className="text-gray-500 mb-2">
                        Advanced Mutual Funds
                      </p>
                      <div className="flex items-center gap-1">
                        <Icon
                          icon="mdi-light:clock"
                          width="16"
                          height="16"
                          style={{ color: "6b7280" }}
                        />
                        <p className="text-gray-500 text-xs">
                          Today at 2:00 PM (45 min)
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="bordered">
                    Start
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-md bg-gray-100`}
                    >
                      <Icon icon="lucide:calendar" width={24} />
                    </div>
                    <div className="flex flex-col text-sm">
                      <p className="font-semibold">Advanced Mutual Funds</p>
                      <p className="text-gray-500 mb-2">
                        Advanced Mutual Funds
                      </p>
                      <div className="flex items-center gap-1">
                        <Icon
                          icon="mdi-light:clock"
                          width="16"
                          height="16"
                          style={{ color: "6b7280" }}
                        />
                        <p className="text-gray-500 text-xs">
                          Today at 2:00 PM (45 min)
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="bordered">
                    Start
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-md bg-gray-100`}
                    >
                      <Icon icon="lucide:calendar" width={24} />
                    </div>
                    <div className="flex flex-col text-sm">
                      <p className="font-semibold">Advanced Mutual Funds</p>
                      <p className="text-gray-500 mb-2">
                        Advanced Mutual Funds
                      </p>
                      <div className="flex items-center gap-1">
                        <Icon
                          icon="mdi-light:clock"
                          width="16"
                          height="16"
                          style={{ color: "6b7280" }}
                        />
                        <p className="text-gray-500 text-xs">
                          Today at 2:00 PM (45 min)
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="bordered">
                    Start
                  </Button>
                </div>
              </CardBody>
            </Card>

            <Card className="p-2">
              <CardHeader>
                <p className="text-xl font-semibold">Recent Activity</p>
              </CardHeader>
              <CardBody className="flex flex-col gap-6">
                <div className="flex gap-2">
                  <Icon
                    icon="lets-icons:done-ring-round"
                    width="20"
                    height="20"
                    style={{ color: "#17C964" }}
                  />
                  <div className="flex flex-col text-sm gap-1">
                    <p className="font-semibold">
                      Completed lesson: CSS Grid Layout
                    </p>
                    <p className="text-gray-500 text-xs">
                      Introduction to Web Development
                    </p>
                    <div className="flex items-center gap-1">
                      <p className="text-gray-500 text-xs">2 hours ago</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Icon
                    icon="lsicon:refresh-doing-outline"
                    width="20"
                    height="20"
                    style={{ color: "#0f86fc" }}
                  />
                  <div className="flex flex-col text-sm gap-1">
                    <p className="font-semibold">
                      Started lesson: Custom React Hooks
                    </p>
                    <p className="text-gray-500 text-xs">
                      Advanced React Patterns
                    </p>
                    <div className="flex items-center gap-1">
                      <p className="text-gray-500 text-xs">Yesterday</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Icon
                    icon="hugeicons:online-learning-01"
                    width="20"
                    height="20"
                    style={{ color: "8323b6" }}
                  />
                  <div className="flex flex-col text-sm gap-1">
                    <p className="font-semibold">Enrolled in new course</p>
                    <p className="text-gray-500 text-xs">
                      Node.js Backend Development
                    </p>
                    <div className="flex items-center gap-1">
                      <p className="text-gray-500 text-xs">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Icon
                    icon="ic:outline-pending"
                    width="20"
                    height="20"
                    style={{ color: "#fca60f" }}
                  />
                  <div className="flex flex-col text-sm gap-1">
                    <p className="font-semibold">On Going Course</p>
                    <p className="text-gray-500 text-xs">
                      Advanced Mutual Funds
                    </p>
                    <div className="flex items-center gap-1">
                      <p className="text-gray-500 text-xs">1 Week</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default MyCourses;
