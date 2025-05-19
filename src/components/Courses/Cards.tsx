import { Card } from "@heroui/card";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

import { GetOverAllProgress } from "@/services/User";
import { OverAllUserStats } from "@/types/Courses";

export default function Cards({ id }: { id: string }) {
  const [Progress, setProgress] = useState<OverAllUserStats>(
    {} as OverAllUserStats,
  );

  useEffect(() => {
    GetOverAllProgress(id).then((response) => {
      setProgress(response.data[0]);
    });
  }, []);

  const courseStats = [
    {
      title: "Total Chapters",
      value: Progress.totalCompletedChapters + Progress.totalRemainingChapters,
      sub: `${Progress.totalCompletedChapters} / ${
        Progress.totalCompletedChapters + Progress.totalRemainingChapters
      } completed`,
      iconName: "solar:book-2-linear",
      color: "secondary",
    },
    {
      title: "Total Duration",
      value: Progress.totalDuration + " min",
      sub: `${Progress.durationThisWeek} min from last week`,
      iconName: "solar:clock-circle-linear",
      color: "warning",
    },
    {
      title: "Completion Rate",
      value: Progress.averageCompletionRate?.toFixed(2) + "%",
      sub: "+5% from last month",
      iconName: "solar:chart-2-linear",
      color: "success",
    },
    {
      title: "Certificates",
      value: Progress.totalCertificates,
      sub: `${Progress.pendingCertificates} pending completion`,
      iconName: "solar:ranking-linear",
      color: "primary",
    },
  ];

  return (
    <dl className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {courseStats.map(({ title, value, sub, iconName, color }, index) => (
        <Card
          key={index}
          className="border border-transparent dark:border-default-100"
        >
          <div className="flex p-4  items-center gap-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-md bg-${color}-50`}
            >
              <Icon className={`text-${color}`} icon={iconName} width={24} />
            </div>
            <div className="flex flex-col gap-y-1">
              <dt className="text-small font-medium text-default-500">
                {title}
              </dt>
              <dd className="text-2xl font-semibold text-default-700">
                {value}
              </dd>
              {sub && <span className="text-xs text-default-400">{sub}</span>}
            </div>
          </div>
        </Card>
      ))}
    </dl>
  );
}
