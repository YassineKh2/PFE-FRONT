import { Card } from "@heroui/card";
import { Icon } from "@iconify/react";

export default function Cards() {
  const managerStats = [
    {
      title: "Total Clients",
      value: 3,
      sub: null,
      iconName: "solar:users-group-rounded-linear",
      color: "secondary",
    },
    {
      title: "Total AUM",
      value: "€371.25K",
      sub: null,
      iconName: "solar:wallet-money-linear",
      color: "warning",
    },
    {
      title: "Avg Performance",
      value: "+1.8%",
      sub: null,
      iconName: "solar:chart-2-linear",
      color: "success",
    },
    {
      title: "Active Orders",
      value: 12,
      sub: null,
      iconName: "solar:document-linear",
      color: "primary",
    },
  ];

  return (
    <dl className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {managerStats.map(({ title, value, sub, iconName, color }, index) => (
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
