import EditChapterFrom from "@/components/Chapters/EditChapterFrom";
import { subtitle, title } from "@/components/primitives";
import DashboardLayout from "@/layouts/dashboard";

export default function EditChapter() {
  return (
    <DashboardLayout>
      <h1 className={title({size:"sm",boldness:"bold"})}>Chapters</h1>
      <div className={subtitle({size:"xs"})+ " text-gray-400"}>Edit the chapter</div>
      <EditChapterFrom />
    </DashboardLayout>
  );
}   
