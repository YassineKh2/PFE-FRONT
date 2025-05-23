import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Divider } from "@heroui/divider";
import { Link, useNavigate } from "react-router-dom";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { addToast } from "@heroui/toast";

import { subtitle, title } from "../../primitives";

import { DeleteCourse as DeleteCourseService } from "@/services/Course";
import { CourseType as Course } from "@/types/Courses";

const Header = ({ course }: { course: Course }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const naviagte = useNavigate();
  const AddedAt = new Date(course.createdAt || "").toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const EditedAt = new Date(course.editedAt || "").toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  function DeleteCourse(): void {
    DeleteCourseService(course.id as string).then((res) => {
      if (res.status === 200) {
        addToast({
          title: "Success",
          description: "Course deleted successfully",
          color: "success",
        });
        naviagte("/dashboard/courses");
        onClose();
      } else {
        addToast({
          title: "Error",
          description: "Something went wrong",
          color: "danger",
        });
        onClose();
      }
    });
  }


  return (
    <>
      <section className="flex flex-col gap-2">
        <div className="flex gap-2 flex-col xl:flex-row justify-between">
          <p className={title({ size: "sm" })}>{course.title}</p>
          <div className="flex justify-between gap-3 items-center">
            <Button
              as={Link}
              className="text-gray-100"
              color="primary"
              size="md"
              to={"/dashboard/courses/edit/" + course.id}
              variant="solid"
            >
              <Icon
                height="20"
                icon="mynaui:edit"
                style={{ color: "#f3f4f6" }}
                width="20"
              />
              Edit Course
            </Button>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="solid">More</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="new"
                  startContent={
                    <Icon height="18" icon="bi:archive" width="18" />
                  }
                >
                  Archive
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  startContent={
                    <Icon
                      className="transition-colors duration-200"
                      height="20"
                      icon="fluent:delete-48-regular"
                      width="20"
                    />
                  }
                  onPress={onOpen}
                >
                  Delete Course
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <p className={subtitle({ size: "xs" })}>{course.description}</p>
        <Divider />
        <div className="flex flex-wrap gap-4 justify-start text-sm text-gray-900">
          <p className="flex items-center gap-1">
            <Icon
              height="20"
              icon="mdi-light:clock"
              style={{ color: "111827" }}
              width="20"
            />
            {Math.round(Number(course.duration) / 60)} Hours
          </p>
          <p className="flex items-center gap-1">
            <Icon
              height="24"
              icon="material-symbols:star-rounded"
              style={{ color: "#ffc804" }}
              width="24"
            />
            4.8 (124 reviews)
          </p>
          <p className="flex items-center gap-1">
            <Icon
              height="20"
              icon="hugeicons:online-learning-01"
              style={{ color: "111827" }}
              width="20"
            />
            {course.enrolledStudents?.length} Enrolled
          </p>
          <p className="flex items-center gap-1">
            <Icon
              height="20"
              icon="uit:calender"
              style={{ color: "111827" }}
              width="20"
            />
            Created: {AddedAt || "N/A"}
          </p>
          <p className="flex items-center gap-1">
            <Icon
              height="20"
              icon="uis:calender"
              style={{ color: "111827" }}
              width="20"
            />
            Last updated: {EditedAt || "N/A"}
          </p>
        </div>
      </section>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center items-center">
                <Icon
                  height="80"
                  icon="mynaui:danger-triangle"
                  style={{ color: "#fc3c61" }}
                  width="80"
                />
              </ModalHeader>
              <ModalBody className="flex flex-col items-center text-center">
                <h1 className="text-default-900 font-semibold text-3xl">
                  Delete Course
                </h1>
                <p className="text-default-400 mt-2">
                  Are you sure you want to delete{" "}
                  <strong>{course?.title}</strong> ! This action cannot be
                  undone.
                </p>
              </ModalBody>
              <ModalFooter className="flex justify-between items-center gap-2 w-full">
                <Button
                  className="w-full"
                  color="default"
                  variant="solid"
                  onPress={() => {
                    onClose();
                  }}
                >
                  No, Keep it
                </Button>
                <Button
                  className="w-full"
                  color="primary"
                  onPress={DeleteCourse}
                >
                  Yes, Delete it
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Header;
