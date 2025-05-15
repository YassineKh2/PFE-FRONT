import { Button } from "@heroui/button";
import { Chip, ChipProps } from "@heroui/chip";
import {
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { ChangeEvent, Key, useCallback, useMemo, useState, useEffect } from "react";
import CourseTableToolbar from "./CourseTableToolbar";
import CourseTableFooter from "./CourseTableFooter";
import { CourseType as Course } from "@/types/Courses";
import { Icon } from "@iconify/react/dist/iconify.js";
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
import { Link } from "react-router-dom";

const courseStatusOptions = [
  { name: "Published", uid: "published" },
  { name: "Draft", uid: "draft" },
  { name: "Archived", uid: "archived" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  published: "success",
  draft: "warning",
  archived: "default",
};

const INITIAL_VISIBLE_COLUMNS = [
  "title",
  "instructor",
  "status",
  "actions",
  "level",
];

// --- Mock Data and Types ---
const courseColumns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "TITLE", uid: "title", sortable: true },
  { name: "INSTRUCTOR", uid: "instructor", sortable: true },
  { name: "CATEGORY", uid: "category" },
  { name: "DURATION", uid: "duration", sortable: true },
  { name: "LEVEL", uid: "level", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export default function CourseTable({
  courses,
  setCourses,
}: {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}) {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "title",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return courseColumns;
    return courseColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filtered = [...courses];
    if (hasSearchFilter) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== courseStatusOptions.length
    ) {
      filtered = filtered.filter((course) =>
        Array.from(statusFilter).includes(course.status)
      );
    }
    return filtered;
  }, [filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const [sortedItems, setSortedItems] = useState<Course[]>([]);

  // Update sortedItems whenever items or sortDescriptor changes
  useEffect(() => {
    setSortedItems(
      [...items].sort((a: Course, b: Course) => {
        const first = a[sortDescriptor.column as keyof Course] as string;
        const second = b[sortDescriptor.column as keyof Course] as string;
        const cmp = first < second ? -1 : first > second ? 1 : 0;
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      })
    );
  }, [items, sortDescriptor]);

  const renderCell = useCallback((course: Course, columnKey: Key) => {
    const cellValue = course[columnKey as keyof Course];
    switch (columnKey) {
      case "title":
        return <span className="font-semibold">{cellValue}</span>;
      case "instructor":
        return <span>{cellValue}</span>;
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[course.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center">
            <Tooltip content="Details" color="foreground">
              <Button as={Link} to={"/dashboard/courses/details/"+course.id} isIconOnly size="sm" variant="light">
                <Icon
                  icon="solar:eye-outline"
                  width="20"
                  height="20"
                  style={{ color: "#9A9AA0" }}
                />
              </Button>
            </Tooltip>
            <Tooltip content="Edit" color="foreground">
              <Button as={Link} to={"/dashboard/courses/edit/"+course.id} isIconOnly size="sm" variant="light">
                <Icon
                  icon="mynaui:edit"
                  width="20"
                  height="20"
                  style={{ color: "#9A9AA0" }}
                />
              </Button>
            </Tooltip>
            <Tooltip content="Delete" color="primary">
              <Button
                onPress={() => {
                  setSelectedCourse(course);
                  onOpen();
                }}
                isIconOnly
                color="primary"
                size="sm"
                variant="light"
              >
                <Icon
                  icon="fluent:delete-48-regular"
                  width="20"
                  height="20"
                  style={{ color: "#fc3c61" }}
                />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) setPage(page + 1);
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  function DeleteCourse(): void {
    if (!selectedCourse) return;

    DeleteCourseService(selectedCourse.id as string).then((res) => {
      if (res.status === 200) {
        addToast({
          title: "Success",
          description: "Course deleted successfully",
          color: "success",
        });

        setSelectedCourse(null);
        setSelectedKeys(new Set([]));
        const newCourses = courses.filter(
          (course) => course.id !== selectedCourse.id
        );
        setCourses(newCourses);
        setSortedItems(newCourses);
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
    <div>
      <CourseTableToolbar
        filterValue={filterValue}
        onSearchChange={onSearchChange}
        onClear={onClear}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
      />
      <div className="flex justify-between items-center mt-2 mb-2">
        <span className="text-default-400 text-small">
          Total {courses.length} courses
        </span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={onRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
      <Table
        isHeaderSticky
        aria-label="Courses table"
        bottomContent={
          <CourseTableFooter
            selectedKeys={selectedKeys}
            filteredItemsLength={filteredItems.length}
            page={page}
            pages={pages}
            setPage={setPage}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
          />
        }
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No courses found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

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
                  Are you sure you want to delete {selectedCourse?.title} ! This
                  action cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter className="flex justify-between items-center gap-2 w-full">
                <Button
                  className="w-full"
                  color="default"
                  variant="solid"
                  onPress={() => {
                    onClose();
                    setSelectedCourse(null);
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
    </div>
  );
}
