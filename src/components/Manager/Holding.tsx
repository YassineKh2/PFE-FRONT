import { Card } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserAssetDetails } from "@/types/Deposit";
import { GetUserAssetsInfo } from "@/services/Deposit";

function Holding({ userid }: { userid: string }) {
  const [portfolioFunds, setportfolioFunds] = useState(
    [] as UserAssetDetails[],
  );
  const navigate = useNavigate();

  useEffect(() => {
    GetUserAssetsInfo(userid).then((response) => {
      setportfolioFunds(response);
    });
  }, []);

  return (
    <div>
      <Card className="p-4 overflow-auto h-[106vh]">
        <div className="flex items-center gap-2 mb-4">
          <Icon
            className="text-primary-500"
            icon="mdi:briefcase-outline"
            width={22}
          />
          <p className="text-xl font-bold">Your Holdings</p>
        </div>
        <div className="flex flex-col gap-4">
          {(portfolioFunds || []).map((fund) => (
            <div
              key={fund.isin}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <Link
                    className="font-semibold text-gray-900 hover:text-primary-600"
                    to={`/fund/${fund.isin}`}
                  >
                    {fund.fund_name}
                  </Link>
                  <p className="text-sm text-gray-600">
                    {fund.fund_category} • {fund.risk} Risk
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg text-gray-900">
                    €{fund.amount_invested}
                  </p>
                  <div className="flex items-center justify-end">
                    {fund.todayChange >= 0 ? (
                      <Icon
                        className="h-3 w-3 text-green-500 mr-1"
                        icon="mdi:trending-up"
                        width={14}
                      />
                    ) : (
                      <Icon
                        className="h-3 w-3 text-red-500 mr-1"
                        icon="mdi:trending-down"
                        width={14}
                      />
                    )}
                    <span
                      className={`text-sm ${fund.todayChange >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {fund.todayChange >= 0 ? "+" : ""}
                      {fund.todayChange}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Units</p>
                  <p className="font-medium">{fund.total_units}</p>
                </div>
                <div>
                  <p className="text-gray-600">Current Price</p>
                  <p className="font-medium">€{fund.current_nav}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Returns</p>
                  <div className="flex items-center">
                    <span
                      className={`font-medium ${fund.gains >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {fund.gains >= 0 ? "+" : ""}€
                      {Math.abs(fund.gains).toLocaleString()}
                    </span>
                    <span
                      className={`text-xs ml-1 ${fund.gains_percentage >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      ({fund.gains_percentage >= 0 ? "+" : ""}
                      {fund.gains_percentage}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Holding;
