import AllCourses from "@/components/Courses/AllCourses";
import { subtitle, title } from "@/components/primitives";
import DashboardLayout from "@/layouts/dashboard";

export default function Courses() {
  return (
    <DashboardLayout>
      <h1 className={title({ size: "sm", boldness: "bold" })}>Courses</h1>
      <div className={subtitle({ size: "xs" }) + " text-gray-400"}>
        Add , Edit , and search all exiting courses
      </div>
      <AllCourses />
    </DashboardLayout>
  );
}
