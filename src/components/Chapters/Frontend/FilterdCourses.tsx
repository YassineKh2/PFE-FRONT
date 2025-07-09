import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { Progress } from "@heroui/progress";
import { Select, SelectItem } from "@heroui/select";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CourseType, ProgressType } from "@/types/Courses";
import { GetProgress } from "@/services/User";
import { GetStaticImages } from "@/services/GetStaticFiles";
import { useAuth } from "@/providers/AuthProvider";
import { SearchIcon } from "@/components/icons";

function FilterdCourses({
  Courses,
  InDashboard,
  InAll,
}: {
  Courses: CourseType[];
  InDashboard?: Boolean;
  InAll?: Boolean;
}) {
  const [SearchTerm, setSearchTerm] = useState<string>("");
  const [ProgressList, setProgressList] = useState<ProgressType[]>(
    [] as ProgressType[],
  );

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const filteredCourses = Courses.filter((course) => {
    const term = SearchTerm.toLowerCase();

    return (
      course.title.toLowerCase().includes(term) ||
      course.description.toLowerCase().includes(term) ||
      course.instructor.toLowerCase().includes(term)
    );
  });

  const Gotocourse = (id: string) => {
    if (!InDashboard) {
      navigate("/courses/view/" + id);

      return;
    }
    const progress = ProgressList.filter((prog) => prog.courseId === id);

    navigate("/courses/chapter/" + progress[0].currentChapter);
  };

  useEffect(() => {
    if (!InDashboard) return;
    GetProgress(currentUser.uid).then((response) => {
      setProgressList(response.data);
    });
  }, []);

  return (
    <div className="flex flex-col w-full gap-4">
      {!InDashboard && (
        <>
          <div className="flex justify-between gap-6">
            <Input
              aria-label="Search"
              className="w-full"
              labelPlacement="outside"
              placeholder="Search courses..."
              startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
              }
              type="search"
              variant="bordered"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select className="max-w-xs self-end" placeholder="Sort" size="md">
              <SelectItem key="populatary" textValue={"Populatary"}>
                Populatary
              </SelectItem>
              <SelectItem key="rating" textValue={"Rating - High To Low"}>
                Newest
              </SelectItem>
              <SelectItem key="returns" textValue={"Returns - High To Low"}>
                Most Rated
              </SelectItem>
            </Select>
          </div>

          <p className="text-sm text-gray-500">
            Showing {filteredCourses.length} of {Courses.length} courses
          </p>
        </>
      )}
      {InDashboard && !InAll && (
        <div className="flex justify-between items-center">
          <p className="font-semibold text-xl">My Courses</p>
          <Button
            as={Link}
            size="sm"
            to={"/dashboard/courses/owned"}
            variant="bordered"
          >
            View All
          </Button>
        </div>
      )}

      <div
        className={
          InAll
            ? "grid grid-cols-1 md:grid-cols-3 gap-6"
            : InDashboard
              ? "grid grid-cols-1 md:grid-cols-2 gap-6"
              : "grid grid-cols-1 md:grid-cols-3 gap-6"
        }
      >
        {filteredCourses.map((course, index) => {
          let percent = 0;

          if (InDashboard) {
            const progressObj = ProgressList.find(
              (p) => p.courseId === course.id,
            );

            percent = progressObj?.progress || 0;
          }

          return (
            <Card
              key={index}
              isPressable
              className="w-full"
              onPress={() => {
                Gotocourse(course?.id || "");
              }}
            >
              {InDashboard && <Progress className="p-4" value={percent} />}
              <Image
                alt="Card background"
                className="object-cover rounded-none w-full"
                height={!InDashboard ? 180 : 200}
                src={GetStaticImages(course.image)}
              />
              <CardBody className="overflow-visible py-2">
                <div className="h-full flex flex-col gap-2 justify-between items-start">
                  <div>
                    <div className="flex justify-between w-full py-2">
                      <Chip size="sm" variant="bordered">
                        {course.level}
                      </Chip>
                      <div className="flex items-center text-xs">
                        <Icon
                          height="24"
                          icon="material-symbols:star-rounded"
                          style={{ color: "#ffc804" }}
                          width="24"
                        />
                        4.8
                      </div>
                    </div>

                    <div className="py-2">
                      <p className="text-lg font-semibold">{course.title}</p>
                      <p className="text-sm text-gray-500">
                        {course.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full justify-between text-sm mb-2 font-semibold">
                    <div className="flex">
                      <p>Instructor:&nbsp;</p>
                      <p> {course.instructor}</p>
                    </div>
                    {InDashboard && (
                      <div className="flex justify-center items-center gap-1">
                        <Icon
                          height="16"
                          icon="mdi-light:clock"
                          style={{ color: "#1f2937" }}
                          width="16"
                        />
                        <p className="text-xs text-gray-800">
                          {Math.round(Number(course.duration) / 60)} Hours
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardBody>
              {!InDashboard && (
                <CardFooter className="bg-gray-100/90 flex justify-between gap-2 p-4">
                  <div className="flex gap-2">
                    <div className="flex justify-center items-center gap-1">
                      <Icon
                        height="16"
                        icon="mdi-light:clock"
                        style={{ color: "#1f2937" }}
                        width="16"
                      />
                      <p className="text-xs text-gray-800">
                        {Math.round(Number(course.duration) / 60)} Hours
                      </p>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                      <Icon
                        height="16"
                        icon="tabler:users"
                        style={{ color: "#1f2937" }}
                        width="16"
                      />
                      <p className="text-xs text-gray-800">152 Student</p>
                    </div>
                  </div>
                  <p className="font-bold self-end">€69.99</p>
                </CardFooter>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default FilterdCourses;
