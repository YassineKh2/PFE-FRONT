import { CourseType as Course } from "@/types/Courses";
import { subtitle, title } from "../../primitives";
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
import { DeleteCourse as DeleteCourseService } from "@/services/Course";
import { addToast } from "@heroui/toast";

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
        <div className="flex justify-between">
          <p className={title({ size: "sm" })}>{course.title}</p>
          <div className="flex gap-3 items-center">
            <Button
              as={Link}
              to={"/dashboard/courses/edit/" + course.id}
              color="primary"
              variant="solid"
              size="md"
              className="text-gray-100"
            >
              <Icon
                icon="mynaui:edit"
                width="20"
                height="20"
                style={{ color: "#f3f4f6" }}
              />
              Edit Course
            </Button>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="solid">More</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  startContent={
                    <Icon icon="bi:archive" width="18" height="18" />
                  }
                  key="new"
                >
                  Archive
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onPress={onOpen}
                  startContent={
                    <Icon
                      icon="fluent:delete-48-regular"
                      width="20"
                      height="20"
                      className="transition-colors duration-200"
                    />
                  }
                >
                  Delete Course
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <p className={subtitle({ size: "xs" })}>{course.description}</p>
        <Divider />
        <div className="flex gap-4 justify-start text-sm text-gray-900">
          <p className="flex items-center gap-1">
            <Icon
              icon="mdi-light:clock"
              width="20"
              height="20"
              style={{ color: "111827" }}
            />
            {course.duration} Hours
          </p>
          <p className="flex items-center gap-1">
            <Icon
              icon="material-symbols:star-rounded"
              width="24"
              height="24"
              style={{ color: "#ffc804" }}
            />
            4.8 (124 reviews)
          </p>
          <p className="flex items-center gap-1">
            <Icon
              icon="hugeicons:online-learning-01"
              width="20"
              height="20"
              style={{ color: "111827" }}
            />
            20 Enrolled
          </p>
          <p className="flex items-center gap-1">
            <Icon
              icon="uit:calender"
              width="20"
              height="20"
              style={{ color: "111827" }}
            />
            Created: {AddedAt || "N/A"}
          </p>
          <p className="flex items-center gap-1">
            <Icon
              icon="uis:calender"
              width="20"
              height="20"
              style={{ color: "111827" }}
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
                  icon="mynaui:danger-triangle"
                  width="80"
                  height="80"
                  style={{ color: "#fc3c61" }}
                />
              </ModalHeader>
              <ModalBody className="flex flex-col items-center text-center">
                <h1 className="text-default-900 font-semibold text-3xl">
                  Delete Course
                </h1>
                <p className="text-default-400 mt-2">
                  Are you sure you want to delete <strong>{course?.title}</strong> ! This action
                  cannot be undone.
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
