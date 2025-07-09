import { Icon } from "@iconify/react";
import { Chip } from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Log } from "@/types/Log";
import { GetLogs } from "@/services/Logs";

function RecentTransactions({ userid }: { userid: string }) {
  const [recentTransactions, setrecentTransactions] = useState([] as Log[]);

  useEffect(() => {
    GetLogs(userid).then((response) => {
      setrecentTransactions(response);
    });
  }, []);

  const getTransactionIcon = (type: string) => {
    const icons: Record<string, string> = {
      Deposit: "mdi:plus",
      Buy: "mdi:arrow-down-right",
      Sell: "mdi:arrow-up-right",
      Withdrawal: "mdi:minus",
    };
    const color: Record<string, string> = {
      Deposit: "green",
      Buy: "blue",
      Sell: "orange",
      Withdrawal: "red",
    };
    const icon = icons[type] || "mdi:currency-usd";

    return (
      <Icon
        inline
        height="16"
        icon={icon}
        style={{ color: color[type] || "gray" }}
        width="16"
      />
    );
  };

  const getBadgeProps = (
    type: string,
  ): {
    color?: "success" | "primary" | "warning" | "danger" | "default";
    variant?: "solid" | "flat";
    className?: string;
  } => {
    switch (type) {
      case "Deposit":
        return { color: "success", variant: "flat" };
      case "Buy":
        return { className: "bg-blue-200", variant: "flat" };
      case "Sell":
        return { color: "warning", variant: "flat" };
      case "Withdrawal":
        return { color: "danger", variant: "flat" };
      default:
        return { color: "default", variant: "flat" };
    }
  };

  const isPositive = (type: string) => type === "Deposit" || type === "Sell";

  return (
    <div className="space-y-3">
      {recentTransactions.map((tx) => (
        <div
          key={tx.userId + tx.date + tx.action}
          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
              {getTransactionIcon(tx.action)}
            </div>
            <div>
              <p className="font-medium text-gray-900">{tx.description}</p>
              {tx.name && <p className="text-sm text-gray-600">{tx.name}</p>}
              <p className="text-xs text-gray-500">{tx.date}</p>
            </div>
          </div>
          <div className="text-right flex items-center space-x-3">
            <div>
              <p
                className={`font-semibold ${
                  isPositive(tx.action) ? "text-green-600" : "text-gray-900"
                }`}
              >
                {isPositive(tx.type) ? "+" : "-"}€{tx.amount.toLocaleString()}
              </p>
            </div>
            <Chip {...getBadgeProps(tx.action)} size="sm">
              {tx.action}
            </Chip>
          </div>
        </div>
      ))}
    </div>
  );
}
export default RecentTransactions;
