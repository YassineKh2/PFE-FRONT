import { ChapterType } from "@/types/Courses";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

function CourseContent({ chapters }: { chapters: ChapterType[] }) {

  //TODO Make Icons dynamic and completed count
  return (
    <>
      <div className="flex justify-between w-full items-center">
        <p className="text-sm font-semibold">Course Content</p>
        <p className="text-xs text-gray-500">2/6</p>
      </div>
      {chapters.map((chapter,index) => (
        <Link to={"/courses/chapter/"+chapter.id} key={index} className="flex flex-col gap-2 w-full hover:bg-gray-100">
          <div className="flex gap-2 justify-between items-center border p-3 rounded-md border-gray-300">
            <p className="text-sm font-semibold">{chapter.title}</p>
            <Icon
              icon="lets-icons:done-ring-round"
              width="20"
              height="20"
              style={{ color: "#17C964" }}
            />
          </div>
        </Link>
      ))}
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2 justify-between items-center border p-3 rounded-md border-gray-300">
          <p className="text-sm font-semibold">What are AMCs ?</p>
          <Icon
            icon="lsicon:refresh-doing-outline"
            width="20"
            height="20"
            style={{ color: "#0f86fc" }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2 justify-between items-center border p-3 rounded-md border-gray-300">
          <p className="text-sm font-semibold">What's an NAV?</p>
          <Icon
            icon="ic:outline-pending"
            width="20"
            height="20"
            style={{ color: "#fca60f" }}
          />
        </div>
      </div>
    </>
  );
}

export default CourseContent;
