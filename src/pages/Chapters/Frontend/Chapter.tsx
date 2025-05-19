import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ViewChapter from "@/components/Chapters/ViewChapter";
import { GetChapter, GetChapters } from "@/services/Chapter";
import { ChapterType } from "@/types/Courses";

function Chapter() {
  const [chapter, setchapter] = useState<ChapterType>({} as ChapterType);
  const [chapters, setchapters] = useState<ChapterType[]>([] as ChapterType[]);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    // Fetch chapters only once
    GetChapter(id).then((response) => {
      const courseId = response.data.courseId;

      GetChapters(courseId).then((chaptersRes) => {
        setchapters(chaptersRes.data);
        const foundChapter = chaptersRes.data.find(
          (ch: ChapterType) => String(ch.id) === String(id),
        );

        setchapter(foundChapter || ({} as ChapterType));
      });
    });
  }, []);

  useEffect(() => {
    if (!id || chapters.length === 0) return;
    const foundChapter = chapters.find((ch) => String(ch.id) === String(id));

    setchapter(foundChapter || ({} as ChapterType));
  }, [id, chapters]);

  if (!chapter && !chapters) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loader">loading</div>
      </div>
    );
  }

  return (
    <>
      <ViewChapter chapter={chapter} chapters={chapters} />
    </>
  );
}

export default Chapter;
