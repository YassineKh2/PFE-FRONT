import { Tab, Tabs } from "@heroui/tabs";
import { useEffect, useState } from "react";
import { Fund } from "@/types/MutualFunds";
import { Button, Divider, NumberInput } from "@heroui/react";
import { Link } from "react-router-dom";
function Investement({ mutualFund }: { mutualFund: Fund }) {
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
    if (!mutualFund) return;
    if (!mutualFund.returns["1Y"]) return;

    if (PeriodInvested === 0) {
      total = TotalInvestement * (getNumber(mutualFund.returns["1Y"]) ?? 0);
    } else if (PeriodInvested === 1) {
      total = TotalInvestement * (getNumber(mutualFund.returns["3Y"]) ?? 0);
    } else {
      total = TotalInvestement * (getNumber(mutualFund.returns["5Y"]) ?? 0);
    }

    const gainPourcentage =
      ((total - (TotalInvestement as number)) / (TotalInvestement as number)) *
      100;

    setApproximatedGain({
      gain: total,
      pourcentage: gainPourcentage,
    });
  };

  const getNumber = (str: string) => {
    const cleaned = str.replace(",", ".").match(/[\d.]+/);
    if (cleaned) return Number(cleaned[0]);
  };

  return (
    <div className="sticky top-20 self-start space-y-4 bg-white rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-6">
      <p className="font-semibold text-xl">Invest Now</p>
      <Tabs
        onSelectionChange={(key) => {
          setInvestementType(Number(key));
        }}
        color="primary"
        fullWidth
      >
        <Tab key={0} title="Monthy"></Tab>
        <Tab key={1} title="One Time"></Tab>
      </Tabs>

      <div className="flex flex-col gap-1 justify-center ">
        <p className="text-sm font-semibold">
          {InvestementType === 0 ? "Monthly SIP Amount" : "One Time Amount"}
        </p>
        <div className="flex items-center w-full">
          <NumberInput
            variant="bordered"
            hideStepper
            size="sm"
            formatOptions={{
              style: "currency",
              currency: "EUR",
            }}
            value={AmountInvested as number}
            minValue={getNumber(mutualFund.minInvestment)}
            onChange={(val) => setAmountInvest(Number(val))}
          />
        </div>
        <p className="text-xs text-gray-500">
          Min. {InvestementType === 0 ? "SIP" : "Investment"}:{" "}
          {mutualFund.minInvestment}
        </p>
      </div>

      {/* Period selection */}
      <div className="flex flex-col gap-1 justify-center ">
        <p className="text-sm font-semibold">Investment Period</p>
        <div className="flex gap-2">
          <Button
            size="sm"
            color={PeriodInvested === 0 ? "primary" : "default"}
            onClick={() => setPeriodInvested(0)}
          >
            1 Year
          </Button>
          <Button
            size="sm"
            color={PeriodInvested === 1 ? "primary" : "default"}
            onClick={() => setPeriodInvested(1)}
          >
            3 Years
          </Button>
          <Button
            size="sm"
            color={PeriodInvested === 2 ? "primary" : "default"}
            onClick={() => setPeriodInvested(2)}
          >
            5 Years
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1 justify-center ">
        <p className="text-sm font-semibold">Summary</p>
        <div className="bg-gray-100 flex flex-col p-4 rounded-md text-sm gap-2">
          <div className="flex justify-between items-center gap-1 ">
            <p className="text-gray-500">Invested Amount</p>
            <p className="font-semibold">
              €{TotalInvestement.toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between items-center gap-1 ">
            <p className="text-gray-500">
              Est. Returns (
              {PeriodInvested === 0 ? "1Y" : PeriodInvested === 1 ? "3Y" : "5Y"}
              )
            </p>
            <p className="font-semibold text-green-500">
              €{ApproximatedGain ? ApproximatedGain.gain.toLocaleString() : "-"}
            </p>
          </div>
          <div className="flex justify-between items-center gap-1 ">
            <p className="text-gray-500">Total Value</p>
            <p className="font-semibold">
              €
              {ApproximatedGain
                ? (ApproximatedGain.gain + TotalInvestement).toLocaleString()
                : "-"}
            </p>
          </div>
        </div>
      </div>

      <Button className="w-full" color="primary">
        Start Investing
      </Button>
      <Divider />
      <div className="flex flex-col gap-4">
        <p className="font-semibold">Simlar Funds</p>
        <div className="flex justify-between text-sm ">
          <div className="flex flex-col gap-1 items-start">
            <Link to="" className="font-semibold hover:text-primary-500">
              ICICI Prudential Bluechip Fund
            </Link>
            <div className="flex justify-center gap-2 text-xs text-gray-500">
              <p>Large Cap</p>
              <p className="text-green-500">+14.2%</p>
            </div>
          </div>
          <Button variant="bordered" size="sm">
            Compare
          </Button>
        </div>
        <div className="flex justify-between text-sm">
          <div className="flex flex-col gap-1 items-start">
            <Link to="" className="font-semibold hover:text-primary-500">
              Axis Midcap Fund
            </Link>
            <div className="flex justify-center gap-2 text-xs text-gray-500">
              <p>Mid Cap</p>
              <p className="text-green-500">+16.2%</p>
            </div>
          </div>
          <Button variant="bordered" size="sm">
            Compare
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Investement;
