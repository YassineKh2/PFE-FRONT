import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

import { QuickStats as QuickStatsType } from "@/types/Deposit";
import { GetQuickStats } from "@/services/Deposit";

function QuickStats({ userid }: { userid: string }) {
  const [quickStats, setQuickStats] = useState({} as QuickStatsType);

  useEffect(() => {
    GetQuickStats(userid).then((response) => {
      setQuickStats(response);
    });
  }, []);

  return (
    <Card>
      <CardBody className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Icon className="text-primary-500" icon="bx:stats" width={22} />
          <p className="text-xl font-bold">Quick Stats</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Invested</span>
          <span className="font-semibold">{quickStats.total_invested}€</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Number of Funds</span>
          <span className="font-semibold">{quickStats.num_funds}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Best Performer</span>
          <span className="text-sm font-semibold text-green-600">
            {quickStats.best_performer}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Portfolio Age</span>
          <span className="font-semibold">{quickStats.portfolio_age}</span>
        </div>
      </CardBody>
    </Card>
  );
}

export default QuickStats;
