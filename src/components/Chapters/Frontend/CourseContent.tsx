import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

import { ChapterType, ProgressType } from "@/types/Courses";

function CourseContent({
  chapters,
  progress,
}: {
  chapters: ChapterType[];
  progress: ProgressType;
}) {
  const currentIndex = chapters.findIndex(
    (chapter) => chapter.id === progress.currentChapter,
  );

  const chaptersBefore = chapters.slice(0, currentIndex);

  const getChapterStatusIcon = (chapterId: string) => {
    if (chaptersBefore.some((chapter) => chapter.id === chapterId)) {
      // Chapters before the current one: done
      return (
        <Icon
          height="20"
          icon="lets-icons:done-ring-round"
          style={{ color: "#17C964" }}
          width="20"
        />
      );
    }

    if (
      chapterId === progress.currentChapter &&
      currentIndex == chapters.length - 1
    ) {
      return (
        <Icon
          height="20"
          icon="lets-icons:done-ring-round"
          style={{ color: "#17C964" }}
          width="20"
        />
      );
    }

    if (chapterId === progress.currentChapter) {
      return (
        <Icon
          height="20"
          icon="lsicon:refresh-doing-outline"
          style={{ color: "#0f86fc" }}
          width="20"
        />
      );
    }

    // Chapters after the current one: pending
    return (
      <Icon
        height="20"
        icon="ic:outline-pending"
        style={{ color: "#fca60f" }}
        width="20"
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
          key={index}
          className="flex flex-col gap-2 w-full hover:bg-gray-100"
          to={"/courses/chapter/" + chapter.id}
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
