import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "@heroui/input";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { Avatar } from "@heroui/avatar";
import { addToast } from "@heroui/toast";

import StudentTable from "./StudentTable";

import { IconSvgProps } from "@/types";
import { GetEnrolledStudents } from "@/services/Course";
import { CourseStateType, EnrolledUserType } from "@/types/Courses";
import { User } from "@/types/User";
import { Enroll, GetAll } from "@/services/User";

const SearchIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const EnrolledStudents = ({ id }: { id: string }) => {
  const [Students, setStudents] = useState<EnrolledUserType[]>(
    [] as EnrolledUserType[],
  );
  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    GetEnrolledStudents(id).then((response) => {
      setStudents(response[0].students);
    });
  }, [id]);
  const [Users, setUsers] = useState<User[]>([] as User[]);

  useEffect(() => {
    GetAll().then((response) => {
      setUsers(response[0]);
    });
  }, []);

  const filteredStudents = Students.filter((student) =>
    `${student.name}`.toLowerCase().includes(search.toLowerCase()),
  );

  const enrolledIds = new Set(Students.map((s) => s.id));
  const availableUsers = Users.filter((u) => !enrolledIds.has(u.id));

  async function AddUser(selectedUser: string | null): Promise<void> {
    if (!selectedUser) return;
    const userToAdd = Users.find((u) => u.id === selectedUser);

    if (!userToAdd) return;

    try {
      const CourseState: CourseStateType = {
        courseId: id,
        completedChapters: [],
        enrolledAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        progress: 0,
      };

      Enroll(userToAdd.id, CourseState).then(() => {
        const newStudent: EnrolledUserType = {
          id: userToAdd.id,
          name: userToAdd.name,
          email: userToAdd.email,
          role: userToAdd.role,
          createdAt: userToAdd.createdAt,
          enrolledCourses: {
            [id]: {
              idCourse: id,
              enrolledAt: new Date().toISOString(),
              lastActive: new Date().toISOString(),
              completedChapters: [],
              progress: 0,
            },
          },
          progress: {
            courseId: id,
            progress: 0,
            currentChapter: "",
          },
        };

        setStudents((prev) => [...prev, newStudent]);
        setSelectedUser(null);
        addToast({
          title: "Added Student",
          description: "Student added successfully",
          color: "success",
        });
        onClose();
      });
    } catch {
      addToast({
        title: "Error",
        description: "Error adding student",
        color: "danger",
      });
      onClose();
    }
  }

  return (
    <>
      <div className="p-6 border rounded-xl border-gray-300 space-y-8">
        <div className="flex flex-col xl:flex-row gap-2 justify-between items-center mb-2">
          <p className="text-2xl inline font-semibold ">Enrolled Students</p>
          <div className="flex justify-between xl:justify-end gap-2 w-full xl:w-fit">
            <Input
              isClearable
              className="w-full"
              placeholder="Search by name..."
              startContent={<SearchIcon />}
              value={search}
              onClear={() => setSearch("")}
              onValueChange={setSearch}
            />
            <Button
              className="lg:w-52"
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
              variant="bordered"
              onPress={onOpen}
            >
              Add Student
            </Button>
          </div>
        </div>
        <StudentTable Students={filteredStudents} id={id} />
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center items-center">
                <span className="text-lg font-semibold">Add Student</span>
              </ModalHeader>
              <ModalBody className="flex flex-col items-center text-center gap-4">
                <form
                  className="w-full flex flex-col gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // TODO: handle add student logic here
                    onClose();
                  }}
                >
                  <Select
                    className="w-full"
                    items={availableUsers}
                    label="Assign user"
                    labelPlacement="outside"
                    listboxProps={{
                      itemClasses: {
                        base: [
                          "rounded-md ",
                          "text-default-500",
                          "transition-opacity",
                          "data-[hover=true]:text-foreground",
                          "data-[hover=true]:bg-default-100",
                          "dark:data-[hover=true]:bg-default-50",
                          "data-[selectable=true]:focus:bg-default-50",
                          "data-[pressed=true]:opacity-70",
                          "data-[focus-visible=true]:ring-default-500",
                        ],
                      },
                    }}
                    popoverProps={{
                      classNames: {
                        base: "before:bg-default-200",
                        content:
                          "p-0 border-small border-divider bg-background",
                      },
                    }}
                    renderValue={(items) => {
                      return items.map((item) => (
                        <div key={item.key} className="flex items-center gap-2">
                          <Avatar
                            alt={item.data?.name}
                            className="flex-shrink-0"
                            size="sm"
                            src={""}
                          />
                          <div className="flex flex-col">
                            <span>{item.data?.name}</span>
                            <span className="text-default-500 text-tiny">
                              ({item.data?.email})
                            </span>
                          </div>
                        </div>
                      ));
                    }}
                    selectedKeys={selectedUser ? [selectedUser] : []}
                    variant="bordered"
                    onSelectionChange={(keys) => {
                      const keyArr = Array.from(keys);

                      setSelectedUser(
                        keyArr.length > 0 ? String(keyArr[0]) : null,
                      );
                    }}
                  >
                    {(user) => (
                      <SelectItem key={user.id} textValue={user.name}>
                        <div className="flex gap-2 items-center ">
                          <Avatar
                            alt={user.name}
                            className="flex-shrink-0"
                            size="sm"
                            src={""}
                          />
                          <div className="flex flex-col">
                            <span className="text-small">{user.name}</span>
                            <span className="text-tiny text-default-400">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                  <Button
                    className="w-full"
                    color="primary"
                    isDisabled={!selectedUser}
                    type="submit"
                    onPress={() => AddUser(selectedUser)}
                  >
                    Add
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter className="flex justify-between items-center gap-2 w-full" />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EnrolledStudents;
