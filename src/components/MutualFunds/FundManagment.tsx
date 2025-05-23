import { Fund } from "@/types/MutualFunds";
import { User } from "@heroui/react";

function FundManagment({ mutualFund }: { mutualFund: Fund }) {
  return (
    <div className="w-full space-y-4 bg-white rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-6">
      <p className="text-2xl dark:text-white font-semibold">
        Fund Manager & Risk Assessment
      </p>
      <div className="flex justify-between ">
        <div className="space-y-2 w-[50%]">
          <p className="font-semibold">Fund Manager</p>
          <User
            name={mutualFund.fund_manager}
            description={
              <div className="space-y-1">
                <p>Experience: 15+ years</p>
                <p className="text-md text-black">
                  Managing this fund since Jan 2010
                </p>
              </div>
            }
            avatarProps={{
              size: "lg",
            }}
            classNames={{
              name: "text-lg",
              base: "space-x-2",
            }}
          />
        </div>
        <div className="flex justify-between w-[50%]">
          <div className="space-y-4 w-full text-sm">
            <p className="font-semibold">Risk Assessment</p>
            <div className="flex flex-col gap-2 ">
              <div className="flex justify-between">
                <p className="text-gray-500">Volatility</p>
                <p className="font-semibold">{mutualFund.volatility}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Sharpe Ratio</p>
                <p className="font-semibold">1.2</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Beta</p>
                <p className="font-semibold">0.85</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Alpha</p>
                <p className="font-semibold">2.6</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Standard Deviation</p>
                <p className="font-semibold">12.5%</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Max Drawdown</p>
                <p className="font-semibold">-15.2%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FundManagment;
