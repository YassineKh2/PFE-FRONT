import { RefuseCourse } from "@/services/User";
import { CourseType } from "@/types/Courses";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Divider,
  Image,
  Progress,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link } from "react-router-dom";

interface PopupProps {
  id:string
  Course: CourseType;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({id, Course, isOpen, onClose, children }) => {
  if (!isOpen || !Course) return null;


  const ClosePop = ()=>{
    RefuseCourse(id)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <Card className="w-full max-w-sm md:max-w-xl ">
        <div>
          <Chip
            size="sm"
            color="warning"
            className="absolute z-50 text-white top-4 left-2"
          >
            98% Match
          </Chip>
          <p className="bg-black/40 px-2 outline-8 outline- rounded-xl text-2xl text-white font-bold absolute z-50 top-40 left-2">
            {Course.title}
          </p>

          <Button
            onPress={ClosePop}
            isIconOnly
            variant="light"
            className="absolute z-50 right-2 top-2 text-gray-300"
          >
            <Icon icon="carbon:close-outline" width="32" height="32" />
          </Button>
          <Image
            src="https://heroui.com/images/hero-card.jpeg"
            alt="Card background"
            className="object-cover rounded-none w-full"
            width={800}
            height={200}
          />
        </div>
        <CardBody className="overflow-visible py-2 px-6">
          <div className="h-full flex flex-col gap-4 justify-between items-start">
            <div className="flex flex-col w-full py-2">
              <p className="font-semibold">
                We've Found the Perfect Course for You!
              </p>
              <p className="text-sm text-gray-500">
                Based on your interests and learning history, we think this
                course would be an excellent fit.
              </p>
            </div>
            <p className="text-sm text-gray-500">{Course.description}</p>

            <div className="flex gap-4">
              <div className="flex items-center text-xs">
                <Icon
                  height="24"
                  icon="material-symbols:star-rounded"
                  style={{ color: "#ffc804" }}
                  width="24"
                />
                4.8 (124 reviews)
              </div>
              <div className="flex justify-center items-center gap-1">
                <Icon
                  height="16"
                  icon="mdi-light:clock"
                  style={{ color: "#1f2937" }}
                  width="16"
                />
                <p className="text-xs text-gray-800">
                  {Math.round(Number(Course.duration) / 60)} Hours
                </p>
              </div>
              <div className="flex justify-center items-center gap-1">
                <Icon
                  height="16"
                  icon="tabler:users"
                  style={{ color: "#1f2937" }}
                  width="16"
                />
                <p className="text-xs text-gray-800">
                  {Course.enrolledStudents?.length} Student
                </p>
              </div>
            </div>
            <Divider />
            <div className="space-y-2">
              <p className="font-semibold">Why this is perfect for you: </p>
              <div className="flex items-center gap-2">
                <Icon
                  height="20"
                  icon="lets-icons:done-ring-round"
                  style={{ color: "#17C964" }}
                  width="20"
                />
                <p>Matches your skill level</p>
              </div>
              <div className="flex items-center gap-2">
                <Icon
                  height="20"
                  icon="lets-icons:done-ring-round"
                  style={{ color: "#17C964" }}
                  width="20"
                />
                <p>Aligns with your learning goals</p>
              </div>
              <div className="flex items-center gap-2">
                <Icon
                  height="20"
                  icon="lets-icons:done-ring-round"
                  style={{ color: "#17C964" }}
                  width="20"
                />
                <p>Taught by {Course.instructor}, a highly-rated instructor</p>
              </div>
            </div>
            <div className="pb-4 flex justify-between w-full mt-2 items-center">
              <p className="font-bold text-2xl">€69.99</p>
              <div className="space-x-2">
                <Button onPress={ClosePop} variant="bordered">Maybe Later</Button>
                <Button onPress={ClosePop} as={Link} to={"/courses/view/"+Course.id} color="primary">Enroll Now</Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Popup;
