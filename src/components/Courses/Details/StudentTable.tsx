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
import React, { SVGProps } from "react";
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

export const students = [
  {
    id: 1,
    name: "Alice Johnson",
    enrolledOn: "2024-09-01",
    progress: 80,
    lastActive: "6 hours",
    avatar: "https://i.pravatar.cc/150?u=student1",
    email: "alice.johnson@example.com",
  },
  {
    id: 2,
    name: "Bob Smith",
    enrolledOn: "2024-10-15",
    progress: 65,
    lastActive: "4 months",
    avatar: "https://i.pravatar.cc/150?u=student2",
    email: "bob.smith@example.com",
  },
  {
    id: 3,
    name: "Carol Lee",
    enrolledOn: "2025-01-10",
    progress: 92,
    lastActive: "2 days ago",
    avatar: "https://i.pravatar.cc/150?u=student3",
    email: "carol.lee@example.com",
  },
];

type Student = (typeof students)[0];

export default function StudentTable() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const pages = Math.ceil(students.length / rowsPerPage) || 1;

  const paginatedStudents = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return students.slice(start, end);
  }, [page, rowsPerPage, students]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) setPage(page + 1);
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const bottomContent = (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400">
        <div className="flex items-center">
          <Dropdown className="bg-background border-1 border-default-200">
            <DropdownTrigger>
              <Button isIconOnly radius="full" size="sm" variant="light">
                <Icon
                  icon="pepicons-pencil:dots-y"
                  width="20"
                  height="20"
                  style={{ color: "#4b5563" }}
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Rows per page"
              onAction={(key) => {
                setRowsPerPage(Number(key));
                setPage(1);
              }}
              selectedKeys={[String(rowsPerPage)]}
            >
              <DropdownItem key="5">5</DropdownItem>
              <DropdownItem key="10">10</DropdownItem>
              <DropdownItem key="15">15</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <p>
            Showing {paginatedStudents.length} of {students.length} students{" "}
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

  const renderCell = React.useCallback(
    (student: Student, columnKey: React.Key) => {
      const cellValue = student[columnKey as keyof Student];
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
              size="sm"
              showValueLabel
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
                    icon="solar:eye-outline"
                    width="20"
                    height="20"
                    style={{ color: "#9A9AA0" }}
                  />
                </span>
              </Tooltip>
              <Tooltip content="Edit student">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Icon
                    icon="mynaui:edit"
                    width="20"
                    height="20"
                    style={{ color: "#9A9AA0" }}
                  />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete student">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <Icon
                    icon="fluent:delete-48-regular"
                    width="20"
                    height="20"
                    style={{ color: "#fc3c61" }}
                  />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <Table
      removeWrapper
      aria-label="Student table"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={paginatedStudents} emptyContent={"No students found"}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
