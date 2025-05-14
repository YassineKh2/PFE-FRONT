import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "@heroui/input";
import { IconSvgProps } from "@/types";
import StudentTable from "./StudentTable";

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

const EnrolledStudents = () => (
  <div className="p-6 border rounded-xl border-gray-300 space-y-8">
    <div className="flex justify-between items-center mb-2">
      <p className="text-2xl inline font-semibold ">Enrolled Students</p>
      <div className="flex justify-end gap-2">
        <Input
          isClearable
          className="w-full"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
        />
        <Button
          startContent={<Icon icon="ei:plus" width="25" height="25" style={{ color: "#9A9AA0" }} />}
          variant="bordered"
          color="default"
          size="md"
        >
          Add Student
        </Button>
      </div>
    </div>
    <StudentTable />
  </div>
);

export default EnrolledStudents;
