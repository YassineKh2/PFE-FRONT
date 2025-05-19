import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Divider } from "@heroui/divider";
import { Link } from "react-router-dom";
import { addToast } from "@heroui/toast";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { useState } from "react";

import { DeleteChapter } from "@/services/Chapter";
import { ChapterType as Chapter } from "@/types/Courses";

const Content = ({
  id,
  chapters,
  setChapters,
}: {
  id: string;
  chapters: Chapter[];
  setChapters: React.Dispatch<React.SetStateAction<Chapter[]>>;
}) => {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleDelete = () => {
    DeleteChapter(selectedChapter?.id || "")
      .then(() => {
        addToast({
          title: "Chapter deleted successfully",
          color: "success",
        });
        setChapters((prev) =>
          prev.filter((chapter) => chapter.id !== selectedChapter?.id),
        );
      })
      .catch(() => {
        addToast({
          title: "Error deleting chapter",
          color: "danger",
        });
      });
    onClose();
  };

  return (
    <>
      <div className="p-6 border rounded-xl border-gray-300 space-y-8">
        <div className="flex justify-between items-center mb-2">
          <p className="text-2xl inline font-semibold ">Course Content</p>
          <Button
            as={Link}
            color="default"
            size="md"
            startContent={
              <Icon
                height="25"
                icon="ei:plus"
                style={{ color: "#9A9AA0" }}
                width="25"
              />
            }
            to={"/dashboard/chapter/add/" + id}
            variant="bordered"
          >
            Add Chapter
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          {chapters.map((chapter, i) => (
            <div key={i}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">
                    Chapter {chapter.order}: {chapter.title}
                  </p>
                  <p className="text-sm hidden lg:block text-gray-500">{chapter.description}</p>
                </div>
                <div className="flex gap-3 items-center">
                  <p className="flex items-center gap-1 text-gray-600">
                    <Icon
                      height="20"
                      icon="mdi-light:clock"
                      style={{ color: "4b5563" }}
                      width="20"
                    />
                    {chapter.duration}min
                  </p>
                  <Dropdown className="bg-background border-1 border-default-200">
                    <DropdownTrigger>
                      <Button
                        isIconOnly
                        radius="full"
                        size="sm"
                        variant="light"
                      >
                        <Icon
                          height="20"
                          icon="pepicons-pencil:dots-y"
                          style={{ color: "#4b5563" }}
                          width="20"
                        />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        key="view"
                        startContent={
                          <Icon
                            icon="solar:eye-outline"
                            width="20"
                            height="20"
                            style={{ color: "#9A9AA0" }}
                          />
                        }
                        as={Link}
                        //@ts-ignore
                        to={"/courses/chapter/" + chapter.id}
                      >
                        View
                      </DropdownItem>
                      <DropdownItem
                        key="edit"
                        startContent={
                          <Icon
                            icon="mynaui:edit"
                            width="20"
                            height="20"
                            style={{ color: "#9A9AA0" }}
                          />
                        }
                        as={Link}
                        //@ts-ignore
                        to={"/dashboard/chapter/edit/" + chapter.id}
                      >
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        className="text-danger group"
                        color="danger"
                        startContent={
                          <Icon
                            className="transition-colors duration-200"
                            height="20"
                            icon="fluent:delete-48-regular"
                            width="20"
                          />
                        }
                        onPress={() => {
                          setSelectedChapter(chapter);
                          onOpen();
                        }}
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
              <Divider className={i === 4 ? "mt-6" : "my-6"} />
            </div>
          ))}
        </div>
      </div>
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
                  Are you sure you want to delete {selectedChapter?.title} !
                  This action cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter className="flex justify-between items-center gap-2 w-full">
                <Button
                  className="w-full"
                  color="default"
                  variant="solid"
                  onPress={() => {
                    onClose();
                    setSelectedChapter(null);
                  }}
                >
                  No, Keep it
                </Button>
                <Button
                  className="w-full"
                  color="primary"
                  onPress={handleDelete}
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

export default Content;
