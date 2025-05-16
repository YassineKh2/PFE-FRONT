import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Icon } from "@iconify/react/dist/iconify.js";

function UpcomingCourses() {
  return (
    <Card className="p-2">
      <CardHeader>
        <p className="text-xl font-semibold">Upcoming Lessons</p>
      </CardHeader>
      <CardBody className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-md bg-gray-100`}
            >
              <Icon icon="lucide:calendar" width={24} />
            </div>
            <div className="flex flex-col text-sm">
              <p className="font-semibold">Advanced Mutual Funds</p>
              <p className="text-gray-500 mb-2">Advanced Mutual Funds</p>
              <div className="flex items-center gap-1">
                <Icon
                  height="16"
                  icon="mdi-light:clock"
                  style={{ color: "6b7280" }}
                  width="16"
                />
                <p className="text-gray-500 text-xs">
                  Today at 2:00 PM (45 min)
                </p>
              </div>
            </div>
          </div>
          <Button size="sm" variant="bordered">
            Start
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-md bg-gray-100`}
            >
              <Icon icon="lucide:calendar" width={24} />
            </div>
            <div className="flex flex-col text-sm">
              <p className="font-semibold">Advanced Mutual Funds</p>
              <p className="text-gray-500 mb-2">Advanced Mutual Funds</p>
              <div className="flex items-center gap-1">
                <Icon
                  height="16"
                  icon="mdi-light:clock"
                  style={{ color: "6b7280" }}
                  width="16"
                />
                <p className="text-gray-500 text-xs">
                  Today at 2:00 PM (45 min)
                </p>
              </div>
            </div>
          </div>
          <Button size="sm" variant="bordered">
            Start
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-md bg-gray-100`}
            >
              <Icon icon="lucide:calendar" width={24} />
            </div>
            <div className="flex flex-col text-sm">
              <p className="font-semibold">Advanced Mutual Funds</p>
              <p className="text-gray-500 mb-2">Advanced Mutual Funds</p>
              <div className="flex items-center gap-1">
                <Icon
                  height="16"
                  icon="mdi-light:clock"
                  style={{ color: "6b7280" }}
                  width="16"
                />
                <p className="text-gray-500 text-xs">
                  Today at 2:00 PM (45 min)
                </p>
              </div>
            </div>
          </div>
          <Button size="sm" variant="bordered">
            Start
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default UpcomingCourses;
