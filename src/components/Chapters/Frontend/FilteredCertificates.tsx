import { SearchIcon } from "@/components/icons";
import { GetStaticImages } from "@/services/GetStaticFiles";
import { CourseType } from "@/types/Courses";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

function FilteredCertificates({ Courses }: { Courses: CourseType[] }) {
  const [SearchTerm, setSearchTerm] = useState<string>("");

  const filteredCourses = Courses.filter((course) => {
    const term = SearchTerm.toLowerCase();
    return (
      course.title.toLowerCase().includes(term) ||
      course.description.toLowerCase().includes(term) ||
      course.instructor.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <Card className="w-full" key={index}>
            <Image
              alt="Card background"
              className="object-cover rounded-none w-full"
              src={GetStaticImages(course.image)}
              height={180}
            />
            <CardBody className="overflow-visible py-2">
              <div className="flex flex-col gap-2 items-start">
                <div className="flex justify-between w-full py-2">
                  <Chip size="sm" variant="bordered">
                    {course.level}
                  </Chip>
                </div>
                <div className="py-2">
                  <p className="text-lg font-semibold">{course.title}</p>
                  <p className="text-sm text-gray-500">{course.description}</p>
                </div>

                <div className="flex items-end text-xs mb-2 text-gray-500">
                  <div className="flex items-end gap-1">
                    <Icon
                      icon="uil:calender"
                      width="16"
                      height="16"
                      style={{ color: "6b7280" }}
                    />
                    <p>Issued On:&nbsp;</p>
                  </div>
                  <p> {course.finishedAt}</p>
                </div>
                <div className="flex items-end text-xs mb-2 text-gray-500">
                  <div className="flex items-end gap-1">
                    <Icon
                      icon="ix:id"
                      width="16"
                      height="16"
                      style={{ color: "6b7280" }}
                    />
                    <p>Credential ID:&nbsp;</p>
                  </div>
                  <p> WDF-2023-10-001</p>
                </div>
              </div>
            </CardBody>
            <CardFooter className="bg-gray-100/90 flex justify-between gap-2 p-4">
              <Button size="sm" variant="bordered">
                View
              </Button>
              <Button
                startContent={
                  <Icon
                    icon="flowbite:download-outline"
                    width="18"
                    height="18"
                    className="text-default-700"
                  />
                }
                size="sm"
              >
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FilteredCertificates;
