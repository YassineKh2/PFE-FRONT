import { ChapterType, ProgressType } from "@/types/Courses";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

function CourseContent({
  chapters,
  progress,
}: {
  chapters: ChapterType[];
  progress: ProgressType;
}) {
  const currentIndex = chapters.findIndex(
    (chapter) => chapter.id === progress.currentChapter
  );

  const chaptersBefore = chapters.slice(0, currentIndex);

  const getChapterStatusIcon = (chapterId: string) => {
    if (chapterId === progress.currentChapter) {
      return (
        <Icon
          icon="lsicon:refresh-doing-outline"
          width="20"
          height="20"
          style={{ color: "#0f86fc" }}
        />
      );
    }

    if (chaptersBefore.some((chapter) => chapter.id === chapterId)) {
      // Chapters before the current one: done
      return (
        <Icon
          icon="lets-icons:done-ring-round"
          width="20"
          height="20"
          style={{ color: "#17C964" }}
        />
      );
    }

    // Chapters after the current one: pending
    return (
      <Icon
        icon="ic:outline-pending"
        width="20"
        height="20"
        style={{ color: "#fca60f" }}
      />
    );
  };

  return (
    <>
      <div className="flex justify-between w-full items-center">
        <p className="text-sm font-semibold">Course Content</p>
        <p className="text-xs text-gray-500">
          {chaptersBefore.length} / {chapters.length}
        </p>
      </div>
      {chapters.map((chapter, index) => (
        <Link
          to={"/courses/chapter/" + chapter.id}
          key={index}
          className="flex flex-col gap-2 w-full hover:bg-gray-100"
        >
          <div className="flex gap-2 justify-between items-center border p-3 rounded-md border-gray-300">
            <p className="text-sm font-semibold">{chapter.title}</p>
            {getChapterStatusIcon(chapter.id || "")}
          </div>
        </Link>
      ))}
    </>
  );
}

export default CourseContent;
