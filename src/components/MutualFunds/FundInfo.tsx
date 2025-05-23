import { Fund } from "@/types/MutualFunds";
import { Chip } from "@heroui/chip";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { SystemPoints } from "@/types/User";
import { UpdateSystemPreferences } from "@/services/User";

function renderStars(rating: number) {
  return [1, 2, 3, 4, 5].map((i) => {
    if (rating >= i) {
      return (
        <Icon
          key={i}
          icon="material-symbols:star-rounded"
          width="20"
          height="20"
        />
      );
    } else if (rating >= i - 0.5) {
      return (
        <Icon
          key={i}
          icon="material-symbols:star-half-rounded"
          width="20"
          height="20"
        />
      );
    } else {
      return (
        <Icon
          key={i}
          icon="material-symbols:star-outline-rounded"
          width="20"
          height="20"
        />
      );
    }
  });
}
export default function FundInfo({ mutualFund }: { mutualFund: Fund }) {
  const [IsSaved, setIsSaved] = useState<Boolean>(false);

  const { currentUser } = useAuth();
  useEffect(() => {
    const userUID = currentUser.uid;
    if (!userUID) return;

    const savedFunds = localStorage.getItem(`savedFunds_${userUID}`);
    if (!savedFunds) return;

    let savedFundsTable = JSON.parse(savedFunds) as String[];
    setIsSaved(savedFundsTable.includes(mutualFund.isin));
  }, []);

  const SaveFund = () => {
    const userUID = currentUser.uid;
    if (!userUID) return;

    const savedFunds = localStorage.getItem(`savedFunds_${userUID}`);
    let savedFundsTable = savedFunds ? JSON.parse(savedFunds) : [];

    if (savedFundsTable.includes(mutualFund.isin)) return;
    savedFundsTable.push(mutualFund.isin);
    localStorage.setItem(
      `savedFunds_${userUID}`,
      JSON.stringify(savedFundsTable)
    );
    setIsSaved(true);

    const PointsToAdd: SystemPoints = {
      method: "add",
      amount: 2,
      asset: mutualFund.category.toLowerCase(),
      sector: mutualFund.sector.toLowerCase(),
    };
    UpdateSystemPreferences(currentUser.uid, PointsToAdd);
  };

  const RemoveFund = () => {
    const userUID = currentUser.uid;
    if (!userUID) return;

    const savedFunds = localStorage.getItem(`savedFunds_${userUID}`);
    if (!savedFunds) return;

    let savedFundsTable = JSON.parse(savedFunds) as String[];
    savedFundsTable = savedFundsTable.filter(
      (code) => code !== mutualFund.isin
    );

    localStorage.setItem(
      `savedFunds_${userUID}`,
      JSON.stringify(savedFundsTable)
    );
    setIsSaved(false);

    const PointsToAdd: SystemPoints = {
      method: "remove",
      amount: 2,
      asset: mutualFund.category.toLowerCase(),
      sector: mutualFund.sector.toLowerCase(),
    };
    UpdateSystemPreferences(currentUser.uid, PointsToAdd);
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl w-full bg-white rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-6">
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <p className={"text-2xl font-bold"}>{mutualFund.name}</p>
            <Chip size="sm">{mutualFund.risk}</Chip>
          </div>
          <div className="flex items-center gap-2">
            <p>{mutualFund.category}</p>
            <div className="flex text-warning-500 gap-2 items-center">
              <div className="flex">{renderStars(mutualFund.rating)}</div>
              <p className="text-sm text-gray-500">{mutualFund.rating}/5</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            startContent={<Icon icon="ix:compare" width="20" height="20" />}
            variant="bordered"
          >
            Add To Compare
          </Button>
          <Button
            variant="bordered"
            startContent={
              <Icon className="mr-2 h-4 w-4" icon="mdi:share-variant" />
            }
          >
            Share
          </Button>
          <Button
            isIconOnly
            className="bg-white dark:bg-[#18181B] hover:bg-orange-300 dark:hover:bg-orange-500"
          >
            {IsSaved ? (
              <Icon
                icon="material-symbols:star-rounded"
                width="24"
                height="24"
                color="#fdba74"
                onClick={() => {
                  RemoveFund();
                }}
              />
            ) : (
              <Icon
                icon="material-symbols:star-outline-rounded"
                width="24"
                height="24"
                onClick={() => {
                  SaveFund();
                }}
              />
            )}
          </Button>
        </div>
      </div>
      <div className="flex justify-between w-full pe-36">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500">NAV Price</p>
          <div className="flex items-center gap-2">
            <p className="font-bold text-2xl">€{mutualFund.latestnav}</p>
            <p className="text-xs text-green-600">+2.2%</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500">AUM</p>
          <div className="flex items-center gap-2">
            <p className="font-bold text-2xl">
              €{(mutualFund.AUM / 1000000).toFixed(0)}M
            </p>
            <p className="text-xs text-red-500">-0.2%</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500">Expense Ratio</p>
          <div className="flex items-center gap-2">
            <p className="font-bold text-2xl">{mutualFund.expense_ratio}%</p>
            <p className="text-xs text-grays-600">0%</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500">Min. Investment</p>
          <div className="flex items-center gap-2">
            <p className="font-bold text-2xl">{mutualFund.minInvestment}</p>
          </div>
          <p className="text-sm text-gray-500">Monthly SIP</p>
        </div>
      </div>
    </div>
  );
}
