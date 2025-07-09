import { useEffect, useState, useMemo } from "react";
import { Card } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import ReactApexChart from "react-apexcharts";

import { UserAssetDetails } from "@/types/Deposit";
import { GetUserAssetsInfo } from "@/services/Deposit";

function AssetAllocation({ userid }: { userid: string }) {
  const [portfolioFunds, setportfolioFunds] = useState<UserAssetDetails[]>([]);

  useEffect(() => {
    GetUserAssetsInfo(userid).then((response) => {
      setportfolioFunds(response);
    });
  }, [userid]);

  const { labels, series, totalInvestment, colorMap } = useMemo(() => {
    const allocation: Record<string, number> = {};
    let total = 0;

    portfolioFunds.forEach((asset) => {
      const type = asset.fund_category;
      const amount = asset.amount_invested;

      allocation[type] = (allocation[type] || 0) + amount;
      total += amount;
    });

    const colors: string[] = ["#6366f1", "#f59e42", "#10b981", "#eab308"];

    const keys = Object.keys(allocation);
    const values = keys.map((key) => allocation[key]);
    const colorMap: Record<string, string> = {};

    keys.forEach((key, index) => {
      colorMap[key] = colors[index % colors.length];
    });

    return {
      labels: keys,
      series: values,
      totalInvestment: total,
      colorMap,
    };
  }, [portfolioFunds]);

  return (
    <Card className="p-4">
      <div className="flex flex-col items-start justify-center">
        <div className="flex gap-2 items-center">
          <Icon
            className="text-primary-500"
            icon="lsicon:pie-one-outline"
            width={22}
          />
          <p className="text-xl font-bold">Asset Allocation</p>
        </div>

        <div className="self-center">
          <ReactApexChart
            height={180}
            options={{
              chart: { type: "pie" },
              labels: labels,
              colors: labels.map((label) => colorMap[label]),
              legend: { show: false },
              dataLabels: { enabled: false },
              stroke: { width: 0 },
            }}
            series={series}
            type="pie"
            width={180}
          />
        </div>

        <div className="flex flex-col mt-4 gap-1 text-sm w-full">
          {labels.map((label, idx) => {
            const value = series[idx];
            const percentage = totalInvestment
              ? ((value / totalInvestment) * 100).toFixed(1)
              : "0";

            return (
              <div
                key={label}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ background: colorMap[label] }}
                  />
                  <span>{label}</span>
                </div>
                <span className="font-semibold">{percentage}%</span>
              </div>
            );
          })}
          <div className="flex items-center justify-between gap-2 mt-1">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-primary-500" />
              <span>Total</span>
            </div>
            <span className="font-semibold">
              {totalInvestment.toLocaleString("en-US", {
                style: "currency",
                currency: "EUR",
              })}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default AssetAllocation;
