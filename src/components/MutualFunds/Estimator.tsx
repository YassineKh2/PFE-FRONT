import { Tab, Tabs } from "@heroui/tabs";
import { Slider } from "@heroui/slider";
import { useEffect, useState } from "react";
import { title } from "../primitives";
import { MutualFundDetails } from "@/types/MutualFunds";
import { Fund } from "@/types/MutualFunds";
function Estimator({ mutualFund }: { mutualFund: Fund }) {
  // number|number[] To fix ts for slider
  const [AmountInvested, setAmountInvest] = useState<number | number[]>(2000);
  const [InvestementType, setInvestementType] = useState<number>(0);
  const [PeriodInvested, setPeriodInvested] = useState<number>(0);
  const [TotalInvestement, setTotalInvestement] = useState<number>(24000);
  const [ApproximatedGain, setApproximatedGain] = useState<{
    gain: number;
    pourcentage: number;
  }>();

  useEffect(() => {
    calculateTotalInvestement();
  }, [AmountInvested, InvestementType, PeriodInvested]);
  
  useEffect(() => {
    calculateGains();
  }, [TotalInvestement, PeriodInvested]);

  const calculateTotalInvestement = () => {
    let total = 0;
    if (InvestementType === 1) {
      total = AmountInvested as number;
      setTotalInvestement(total);
      return;
    }

    if (PeriodInvested === 0) {
      total = (AmountInvested as number) * 12;
    } else if (PeriodInvested === 1) {
      total = (AmountInvested as number) * 12 * 3;
    } else {
      total = (AmountInvested as number) * 12 * 5;
    }

    setTotalInvestement(total);
  };
  useEffect(() => {
    if (InvestementType) {
      setAmountInvest(20000);
    } else {
      setAmountInvest(2000);
    }
  }, [InvestementType]);

  const calculateGains = () => {
    let total = 0;

    if (PeriodInvested === 0) {
      total = TotalInvestement * 0.9;
    } else if (PeriodInvested === 1) {
      total = TotalInvestement * 1.2;
    } else {
      total = TotalInvestement * 2;
    }

    const gainPourcentage =
      ((total - (TotalInvestement as number)) / (TotalInvestement as number)) *
      100;

    setApproximatedGain({
      gain: total,
      pourcentage: gainPourcentage,
    });
  };

  return (
    <div className="max-w-7xl w-full bg-white rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-6">
      <div className="flex ms-4 flex-col gap-10">
        <Tabs
          onSelectionChange={(key) => {
            setInvestementType(Number(key));
          }}
          variant="underlined"
        >
          <Tab key={0} title="Monthy"></Tab>
          <Tab key={1} title="One Time"></Tab>
        </Tabs>
        <div className="flex flex-col gap-4 justify-center ">
          <p className={title({ size: "sm", color: "pink" })}>
            {AmountInvested} ${" "}
            <text className="text-gray-600 dark:text-white">Invested</text>{" "}
          </p>
          <Slider
            aria-labelledby="slider"
            className="max-w-lg"
            defaultValue={InvestementType ? 20000 : 2000}
            onChange={setAmountInvest}
            formatOptions={{ style: "currency", currency: "usd" }}
            size="sm"
            maxValue={InvestementType ? 100000 : 10000}
            minValue={InvestementType ? 5000 : 500}
            value={AmountInvested}
            step={InvestementType ? 500 : 50}
            showTooltip={true}
            tooltipValueFormatOptions={{ style: "currency", currency: "usd" }}
          />
        </div>
      </div>
      <div className="flex ms-4 flex-col gap-10 mt-4">
        <div className="flex flex-col md:flex-row gap-4 justify-center ">
          <p className="w-full md:w-1/2 my-2 text-lg text-default-600 block max-w-full">
            Over the past
          </p>
          <Tabs
            onSelectionChange={(key) => {
              setPeriodInvested(Number(key));
            }}
            variant="light"
          >
            <Tab key={0} title="1 Year"></Tab>
            <Tab key={1} title="3 Years"></Tab>
            <Tab key={2} title="5 Years"></Tab>
          </Tabs>
        </div>
      </div>
      <hr className="my-4 border-2 border-gray-100 dark:border-gray-700" />
      <div className="flex ms-4 flex-col gap-10 mt-4">
        <div className="flex flex-col gap-4  ">
          <p className="w-full md:w-1/2 text-lg text-default-600 block max-w-full">
            Total investement of {TotalInvestement}$
          </p>
          <p className="w-full text-xl text-default-600 block max-w-full">
            Would have become{" "}
            <text className="font-bold bg-gradient-to-r from-[#f547a1] to-[#F54C7A] bg-clip-text text-transparent">
              {ApproximatedGain?.gain}$
            </text>
            <text
              className={`ms-2 font-bold ${(ApproximatedGain?.pourcentage ?? 0) >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              ({(ApproximatedGain?.pourcentage ?? 0) >= 0 ? "+" : ""}
              {(ApproximatedGain?.pourcentage ?? 0).toFixed(2)}%)
            </text>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Estimator;
