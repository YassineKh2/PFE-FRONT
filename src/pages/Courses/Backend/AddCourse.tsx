import AddCourseFrom from "@/components/Courses/AddCourseFrom";
import { subtitle, title } from "@/components/primitives";
import DashboardLayout from "@/layouts/dashboard";

export default function AddCourse() {
  return (
    <DashboardLayout>
      <h1 className={title({ size: "sm" })}>Courses</h1>
      <div className={subtitle({ size: "xs" }) + " text-gray-400"}>
        Add a new course
      </div>
      <AddCourseFrom />
    </DashboardLayout>
  );
}
