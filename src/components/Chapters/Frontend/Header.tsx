import { UpdateProgress } from "@/services/User";
import { ChapterType } from "@/types/Courses";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router-dom";

function Header({
  chapter,
  Navigation,
  inDashboard,
  id
}: {
  chapter: ChapterType;
  Navigation: {
    nextId: string;
    prevId: string;
    hasNext: boolean;
    hasPrev: boolean;
  };
  inDashboard: boolean;
  id:string
}) {
  const navigate = useNavigate();

  const { nextId, prevId, hasNext, hasPrev } = Navigation;

  const GoNext = () => {
    const progress = {
      courseId: chapter.courseId,
      chapterId: chapter.id || "",
    };
    UpdateProgress(id, progress).then(() => {
      navigate(`/courses/chapter/${nextId}`);
    });
  };

  return (
    <>
      <div className="flex justify-between items-center ">
        <h1 className="tracking-tight inline text-2xl font-bold text-default-900">
          {chapter?.title}
        </h1>
        <div className="flex gap-8">
          <div className="space-x-2">
            {inDashboard && (
              <Tooltip content="Edit">
                <Button
                  as={Link}
                  to={`/dashboard/chapter/edit/${chapter.id}`}
                  variant="light"
                  isIconOnly
                >
                  <Icon icon="mynaui:edit" width="20" height="20" />
                </Button>
              </Tooltip>
            )}
            <Tooltip content="Like">
              <Button variant="light" isIconOnly>
                <Icon icon="iconamoon:like" width="20" height="20" />
              </Button>
            </Tooltip>
            <Tooltip content="Share">
              <Button variant="light" isIconOnly>
                <Icon icon="ri:share-line" width="20" height="20" />
              </Button>
            </Tooltip>
            <Tooltip content="Report an issue">
              <Button variant="light" isIconOnly>
                <Icon icon="tabler:flag" width="20" height="20" />
              </Button>
            </Tooltip>
            <Tooltip content="Mark as completed">
              <Button variant="light" isIconOnly>
                <Icon icon="hugeicons:validation" width="24" height="24" />
              </Button>
            </Tooltip>
          </div>
          <div className="flex items-center gap-2">
            {hasPrev && (
              <Button
                startContent={
                  <Icon
                    className="-rotate-90"
                    icon="majesticons:arrow-up"
                    width="20"
                    height="20"
                  />
                }
                variant="bordered"
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
                    icon="majesticons:arrow-up"
                    width="20"
                    height="20"
                  />
                }
                variant="bordered"
                onPress={GoNext}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
