import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from "@heroui/dropdown";
import { Pagination } from "@heroui/pagination";
import { Progress } from "@heroui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { User } from "@heroui/user";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Key, SVGProps, useCallback, useMemo, useState } from "react";

import { EnrolledUserType } from "@/types/Courses";
import { timeAgo } from "@/Helpers/Utils";
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "ENROLLED ON", uid: "enrolledOn" },
  { name: "PROGRESS", uid: "progress" },
  { name: "LAST ACTIVE", uid: "lastActive" },
  { name: "ACTIONS", uid: "actions" },
];

export default function StudentTable({
  Students,
  id,
}: {
  Students: EnrolledUserType[];
  id: string;
}) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const mappedStudents = useMemo(
    () =>
      Students.map((student) => {
        const course = student.enrolledCourses?.[id];
        let lastActive = "-";
        let enrolledOn = '-'

        if(!course) return

        if (course.lastActive) {
          lastActive = timeAgo(course.lastActive);
        }

         if (course.enrolledAt) {
          enrolledOn = timeAgo(course.enrolledAt);
        }

        return {
          id: student.id,
          name: student.name,
          enrolledOn: enrolledOn,
          progress:
            typeof student.progress === "object" &&
            student.progress?.progress !== undefined
              ? student.progress.progress
              : 0,
          lastActive,
          avatar: `https://i.pravatar.cc/150?u=${student.id}`,
          email: student.email,
        };
      }),
    [Students, id],
  );

  const pages = Math.ceil(mappedStudents.length / rowsPerPage) || 1;

  const paginatedStudents = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return mappedStudents.slice(start, end);
  }, [page, rowsPerPage, mappedStudents]);

  const onNextPage = useCallback(() => {
    if (page < pages) setPage(page + 1);
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page]);

  const bottomContent = (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400">
        <div className="flex items-center">
          <Dropdown className="bg-background border-1 border-default-200">
            <DropdownTrigger>
              <Button isIconOnly radius="full" size="sm" variant="light">
                <Icon
                  height="20"
                  icon="pepicons-pencil:dots-y"
                  style={{ color: "#4b5563" }}
                  width="20"
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Rows per page"
              selectedKeys={[String(rowsPerPage)]}
              onAction={(key) => {
                setRowsPerPage(Number(key));
                setPage(1);
              }}
            >
              <DropdownItem key="5">5</DropdownItem>
              <DropdownItem key="10">10</DropdownItem>
              <DropdownItem key="15">15</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <p>
            Showing {paginatedStudents.length} of {mappedStudents.length}{" "}
            students{" "}
          </p>
        </div>
      </span>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
      />
      <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <Button
          isDisabled={pages === 1}
          size="sm"
          variant="flat"
          onPress={onPreviousPage}
        >
          Previous
        </Button>
        <Button
          isDisabled={pages === 1}
          size="sm"
          variant="flat"
          onPress={onNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );

  const renderCell = useCallback((student: any, columnKey: Key) => {
    const cellValue = student[columnKey as keyof typeof student];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: student.avatar }}
            description={student.email}
            name={cellValue}
          >
            {student.email}
          </User>
        );
      case "enrolledOn":
        return <span>{cellValue}</span>;
      case "progress":
        return (
          <Progress
            showValueLabel
            size="sm"
            value={(cellValue as number) || 0}
          />
        );
      case "lastActive":
        return <span>{cellValue}</span>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Icon
                  height="20"
                  icon="solar:eye-outline"
                  style={{ color: "#9A9AA0" }}
                  width="20"
                />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete student">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <Icon
                  height="20"
                  icon="fluent:delete-48-regular"
                  style={{ color: "#fc3c61" }}
                  width="20"
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <div className="w-full overflow-x-auto overflow-y-hidden">
        <Table
          removeWrapper
          aria-label="Student table"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          className="min-w-[600px] md:min-w-0"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                className="whitespace-nowrap text-xs md:text-sm"
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={"No students found"}
            items={paginatedStudents}
          >
            {(item) => (
              <TableRow key={item?.id}>
                {(columnKey) => (
                  <TableCell className="whitespace-nowrap text-xs md:text-sm">
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
