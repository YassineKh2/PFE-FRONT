import { Card, CardBody, CardHeader } from "@heroui/card";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

import { RecentActivity as RecentActivityType } from "@/types/Courses";
import { GetRecentActivity } from "@/services/User";

// Helper to format time difference
function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;

  return date.toLocaleDateString();
}

// Map activity type to icon and color
const activityIconMap: Record<string, { icon: string; color: string }> = {
  "Completed Lesson": { icon: "lets-icons:done-ring-round", color: "#17C964" },
  "Started Lesson": { icon: "lsicon:refresh-doing-outline", color: "#0f86fc" },
  "Enrolled Course": { icon: "hugeicons:online-learning-01", color: "#8323b6" },
  "On Going Course": { icon: "ic:outline-pending", color: "#fca60f" },
};

function RecentActivity({ id }: { id: string }) {
  const [Activity, setActivity] = useState<RecentActivityType[]>([]);

  useEffect(() => {
    GetRecentActivity(id).then((response) => {
      setActivity(response.data[0]);
    });
  }, [id]);

  return (
    <Card className="p-2">
      <CardHeader>
        <p className="text-xl font-semibold">Recent Activity</p>
      </CardHeader>
      <CardBody className="flex flex-col gap-6">
        {Activity && Activity.length > 0 ? (
          Activity.map((item, idx) => {
            const iconData = activityIconMap[item.type] || {
              icon: "mdi:alert-circle-outline",
              color: "#888",
            };

            return (
              <div key={idx} className="flex gap-2">
                <Icon
                  height="20"
                  icon={iconData.icon}
                  style={{ color: iconData.color }}
                  width="20"
                />
                <div className="flex flex-col text-sm gap-1">
                  <p className="font-semibold">
                    {item.type}: {item.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="text-gray-500 text-xs">
                      {timeAgo(item.time)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm">No recent activity.</p>
        )}
      </CardBody>
    </Card>
  );
}

export default RecentActivity;
