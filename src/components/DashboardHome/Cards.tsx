import { Card } from "@heroui/card";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

import { GetPortfolioMetrics } from "@/services/Deposit";
import { PortfolioMetrics } from "@/types/Deposit";

export default function Cards({ userid }: { userid: string }) {
  const [portfolioMetrics, setPortfolioMetrics] =
    useState<PortfolioMetrics | null>(null);

  useEffect(() => {
    GetPortfolioMetrics(userid).then((response) => {
      setPortfolioMetrics(response);
    });
  }, [userid]);

  const managerStats = portfolioMetrics
    ? [
        {
          title: "Total Portfolio Value",
          value: `€${portfolioMetrics.total_portfolio_value.toLocaleString()}`,
          sub:
            typeof portfolioMetrics.total_gains === "number"
              ? `${portfolioMetrics.total_gains >= 0 ? "+" : "−"}€${Math.abs(
                  portfolioMetrics.total_gains,
                ).toLocaleString()} (${portfolioMetrics.total_gains_percent >= 0 ? "+" : "−"}${Math.abs(
                  portfolioMetrics.total_gains_percent,
                ).toFixed(2)}%) overall`
              : undefined,
          iconName: "solar:wallet-money-linear",
          color: portfolioMetrics.total_gains >= 0 ? "warning" : "danger", // use red for negative
        },
        {
          title: "Total Gains",
          value: `€${portfolioMetrics.total_gains.toLocaleString()}`,
          sub: `${portfolioMetrics.total_gains_percent >= 0 ? "+" : "−"}${Math.abs(
            portfolioMetrics.total_gains_percent,
          ).toFixed(2)}% overall`,
          iconName: "solar:chart-2-linear",
          color: portfolioMetrics.total_gains >= 0 ? "success" : "danger",
        },
        {
          title: "Available Funds",
          value: `€${portfolioMetrics.available_funds.toLocaleString()}`,
          sub: "Ready to invest",
          iconName: "solar:document-linear",
          color: "primary",
        },
        {
          title: "This Month",
          value: `€${portfolioMetrics.this_month.toLocaleString()}`,
          sub: undefined,
          iconName: "solar:calendar-linear",
          color: portfolioMetrics.this_month >= 0 ? "secondary" : "danger",
        },
      ]
    : [];

  return (
    <dl className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {managerStats.length === 0 ? (
        <div className="col-span-4 text-center text-default-400">
          Loading...
        </div>
      ) : (
        managerStats.map(({ title, value, sub, iconName, color }, index) => (
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
                {sub && (
                  <span
                    className={`text-xs ${sub.includes("−") ? "text-danger-500" : "text-default-400"}`}
                  >
                    {sub}
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))
      )}
    </dl>
  );
}
