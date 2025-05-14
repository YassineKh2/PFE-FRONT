import AddChapterFrom from "@/components/Chapters/AddChapterFrom";
import { subtitle, title } from "@/components/primitives";
import DashboardLayout from "@/layouts/dashboard";

export default function AddChapter() {
  return (
    <DashboardLayout>
      <h1 className={title({size:"sm",boldness:"bold"})}>Chapters</h1>
      <div className={subtitle({size:"xs"})+ " text-gray-400"}>Add a new chapter</div>
      <AddChapterFrom />
    </DashboardLayout>
  );
}   
