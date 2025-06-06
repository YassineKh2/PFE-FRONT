import { Tab, Tabs } from "@heroui/tabs";
import { Editor as Editortype } from "@tiptap/react";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

import { ReadOnlyEditor } from "../TipTap/tiptap-editor/ReadOnlyEditor";

import { Navbar } from "./Frontend/Navbar";
import CourseContent from "./Frontend/CourseContent";
import Header from "./Frontend/Header";
import Discussion from "./Frontend/Discussion";
import Resources from "./Frontend/Resources";

import { ChapterType, ProgressType } from "@/types/Courses";
import { GetStaticImages } from "@/services/GetStaticFiles";
import { useAuth } from "@/providers/AuthProvider";
import { GetSingleProgress, UpdateProgress } from "@/services/User";

function ViewChapter({
  chapter,
  chapters,
}: {
  chapter: ChapterType;
  chapters: ChapterType[];
}) {
  const [editor, seteditor] = useState<Editortype | null>(null);
  const [image, setimage] = useState<string>();
  const [inDashboard, setinDashboard] = useState(false);
  const [progress, setProgress] = useState<ProgressType>({} as ProgressType);
  const { currentUser } = useAuth();

  const previousPath =
    window.history.state && window.history.state.idx > 0
      ? document.referrer
      : "/";

  useEffect(() => {
    if (previousPath.match("/dashboard/courses")) {
      setinDashboard(true);
    }
  }, []);

  useEffect(() => {
    GetSingleProgress(currentUser.uid, chapter.courseId).then((res) => {
      setProgress(res.data);
    });
  }, [chapter]);

  useEffect(() => {
    setimage(GetStaticImages(chapter.image));
  }, [chapter]);

  useEffect(() => {
    if (editor && chapter.content) {
      const content = JSON.parse(chapter.content as string);

      editor.commands.setContent(content);
    }
  }, [editor, chapter.content]);

  const navigate = useNavigate();
  const currentIndex = chapters.findIndex((c) => c.id === chapter.id);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < chapters.length - 1;
  let nextId: string = "";
  let prevId: string = "";

  if (hasNext) nextId = chapters[currentIndex + 1]?.id || "";
  if (hasPrev) prevId = chapters[currentIndex - 1]?.id || "";

  const Navigation = {
    nextId: nextId,
    prevId: prevId,
    hasNext: hasNext,
    hasPrev: hasPrev,
  };

  const GoNext = () => {
    const progress = {
      courseId: chapter.courseId,
      chapterId: chapter.id || "",
    };

    UpdateProgress(currentUser.uid, progress).then(() => {
      navigate(`/courses/chapter/${nextId}`);
    });
  };

  if (!progress) return <p>Loading..</p>;

  const isLastChapter = () => {
    return currentIndex === chapters.length - 1;
  };

  const FinishCourse = () => {
    const progress = {
      courseId: chapter.courseId,
      chapterId: chapter.id || "",
    };

    UpdateProgress(currentUser.uid, progress).then(() => {
      navigate(`/courses/quiz/${chapter.courseId}`);
    });
  };

  return (
    <>
      <Navbar
        CourseTitle={chapter.title}
        inDashboard={inDashboard}
        progress={progress}
      />
      <div className="flex flex-col">
        <div className="w-full h-80 overflow-hidden">
          <img
            alt="Chapter Cover"
            className="size-full object-cover"
            src={image}
          />
        </div>
        <div className="flex px-12 gap-8 mt-6 items-start">
          <div className="flex flex-col gap-2 w-[80%] ">
            <Header
              Navigation={Navigation}
              chapter={chapter}
              id={currentUser.uid}
              inDashboard={inDashboard}
            />
            <div>
              <Tabs aria-label="Options" variant="underlined">
                <Tab key="content" title="Content">
                  <ReadOnlyEditor seteditor={seteditor} />
                  <div className="flex justify-between items-center gap-2 mt-10">
                    {hasPrev && (
                      <Button
                        startContent={
                          <Icon
                            className="-rotate-90"
                            height="20"
                            icon="majesticons:arrow-up"
                            width="20"
                          />
                        }
                        variant="solid"
                        onPress={() => navigate(`/courses/chapter/${prevId}`)}
                      >
                        Previous
                      </Button>
                    )}
                    {hasNext && (
                      <Button
                        endContent={
                          <Icon
                            className="rotate-90"
                            height="20"
                            icon="majesticons:arrow-up"
                            width="20"
                          />
                        }
                        variant="bordered"
                        onPress={GoNext}
                      >
                        Next
                      </Button>
                    )}
                    {isLastChapter() && (
                      <Button
                        endContent={
                          <Icon
                            className="rotate-90"
                            height="20"
                            icon="majesticons:arrow-up"
                            width="20"
                          />
                        }
                        variant="bordered"
                        onPress={FinishCourse}
                      >
                        Finish
                      </Button>
                    )}
                  </div>
                </Tab>
                <Tab key="discussion" title="Discussion">
                  <Discussion
                    CourseId={chapter.courseId}
                    currentUser={currentUser}
                  />
                </Tab>
                <Tab key="resources" title="Resources">
                  <Resources />
                </Tab>
              </Tabs>
            </div>
          </div>
          <div className="flex flex-col justify-between items-start gap-2 w-[20%] sticky top-20">
            <CourseContent chapters={chapters} progress={progress} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewChapter;
