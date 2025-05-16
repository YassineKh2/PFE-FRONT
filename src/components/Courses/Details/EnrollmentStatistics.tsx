import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Progress } from "@heroui/progress";
import { useEffect, useState } from "react";

import { CourseStats } from "@/types/Courses";
import { GetCourseStats } from "@/services/Course";

const EnrollmentStatistics = ({ id }: { id?: string }) => {
  const [stats, setStats] = useState<CourseStats>({} as CourseStats);

  useEffect(() => {
    if (!id) return;
    GetCourseStats(id).then((response) => {
      setStats(response.data[0]);
    });
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="p-6 border rounded-xl border-gray-300 space-y-4">
      <p className="text-2xl inline font-semibold ">Enrollment Statistics</p>
      <div className="flex gap-4  items-center">
        <Button disableAnimation isIconOnly className="rounded-full" size="md">
          <Icon
            height="24"
            icon="tabler:users"
            style={{ color: "black" }}
            width="24"
          />
        </Button>
        <div>
          <p className="text-md text-gray-700 font-semibold">Total Enrolled</p>
          <p className="text-xl font-bold">{stats.totalEnrolled}</p>
        </div>
      </div>
      <Progress
        color="default"
        label="Completion Rate"
        showValueLabel={true}
        size="sm"
        value={stats.completionRate}
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col justify-center items-center border rounded-lg border-gray-300 p-3">
          <Icon
            height="24"
            icon="solar:user-check-broken"
            style={{ color: "#17C964" }}
            width="24"
          />
          <p className="text-sm text-gray-600">Total Enrolled</p>
          <p className="text-xl font-bold">{stats.totalEnrolled}</p>
        </div>
        <div className="flex flex-col justify-center items-center border rounded-lg border-gray-300 p-3">
          <Icon
            height="24"
            icon="streamline:money-graph-arrow-increase-ascend-growth-up-arrow-stats-graph-right-grow"
            style={{ color: "#0f86fc" }}
            width="24"
          />
          <p className="text-sm text-gray-600">This Month</p>
          <p className="text-xl font-bold">+{stats.enrolledThisMonth}</p>
        </div>
        <div className="flex flex-col justify-center items-center border rounded-lg border-gray-300 p-3">
          <Icon
            height="24"
            icon="mdi-light:clock"
            style={{ color: "fca60f" }}
            width="24"
          />
          <p className="text-sm text-gray-600">Avg. Completion</p>
          <p className="text-xl font-bold">
            {Math.round(Number(stats.averageCompletionTimeHours) / 60)} days
          </p>
        </div>
        <div className="flex flex-col justify-center items-center border rounded-lg border-gray-300 p-3">
          <Icon
            height="24"
            icon="solar:quit-full-screen-circle-outline"
            style={{ color: "#F31260" }}
            width="24"
          />
          <p className="text-sm text-gray-600">Dropout Rate</p>
          <p className="text-xl font-bold">{stats.dropoutRate}%</p>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentStatistics;
