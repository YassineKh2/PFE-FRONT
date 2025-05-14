import { SearchIcon } from "@/components/icons";
import { GetStaticImages } from "@/services/GetStaticFiles";
import { CourseType } from "@/types/Courses";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FilterdCourses({ Courses }: { Courses: CourseType[] }) {
  const [SearchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate()
  // Filter courses by title, description, or instructor
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
      <div className="flex justify-between gap-6">
        <Input
          aria-label="Search"
          labelPlacement="outside"
          placeholder="Search courses..."
          className="w-full"
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="search"
          variant="bordered"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select className="max-w-xs self-end" size="md" placeholder="Sort">
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
      <p className="text-sm text-gray-500">Showing {filteredCourses.length} of {Courses.length} courses</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <Card onPress={()=>{navigate("/courses/view/"+course?.id)}} className="w-full" isPressable key={index}>
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
                  <div className="flex items-center text-xs">
                    <Icon
                      icon="material-symbols:star-rounded"
                      width="24"
                      height="24"
                      style={{ color: "#ffc804" }}
                    />
                    4.8
                  </div>
                </div>
                <div className="py-2">
                  <p className="text-lg font-semibold">{course.title}</p>
                  <p className="text-sm text-gray-500">{course.description}</p>
                </div>
                <div className="flex text-sm mb-2 font-semibold">
                  <p>Instructor:&nbsp;</p>
                  <p> {course.instructor}</p>
                </div>
              </div>
            </CardBody>
            <CardFooter className="bg-gray-100/90 flex justify-between gap-2 p-4">
              <div className="flex gap-2">
                <div className="flex justify-center items-center gap-1">
                  <Icon
                    icon="mdi-light:clock"
                    width="16"
                    height="16"
                    style={{ color: "#1f2937" }}
                  />
                  <p className="text-xs text-gray-800">{course.duration} Hours</p>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <Icon
                    icon="tabler:users"
                    width="16"
                    height="16"
                    style={{ color: "#1f2937" }}
                  />
                  <p className="text-xs text-gray-800">152 Student</p>
                </div>
              </div>
              <p className="font-bold self-end">€69.99</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FilterdCourses;
