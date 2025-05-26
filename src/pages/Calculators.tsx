import { Tab, Tabs } from "@heroui/tabs";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";

import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import DonutChart from "@/components/Calculator/DonutChart";
import Siders from "@/components/Calculator/Sliders";

export default function Calculators() {
  const [investmentType, setInvestmentType] = useState<0 | 1>(0); // 0 for monthly, 1 for one-time
  const [monthlyInvestment, setMonthlyInvestment] = useState(2000);
  const [oneTimeInvestment, setOneTimeInvestment] = useState(20000);
  const [returnRate, setReturnRate] = useState(12); // percentage
  const [timePeriod, setTimePeriod] = useState(5); // years
  const [calculatedValues, setCalculatedValues] = useState({
    investedAmount: 0,
    estimatedReturns: 0,
    totalValue: 0,
  });

  useEffect(() => {
    calculateInvestmentReturns();
  }, [
    investmentType,
    monthlyInvestment,
    oneTimeInvestment,
    returnRate,
    timePeriod,
  ]);

  const calculateInvestmentReturns = () => {
    let investedAmount = 0;
    let totalValue = 0;

    if (investmentType === 0) {
      // Monthly Investment
      const monthlyRate = returnRate / 1200; // Convert annual rate to monthly
      const months = timePeriod * 12;

      investedAmount = monthlyInvestment * months;
      totalValue =
        monthlyInvestment *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else {
      // One-time Investment
      investedAmount = oneTimeInvestment;
      totalValue =
        oneTimeInvestment * Math.pow(1 + returnRate / 100, timePeriod);
    }

    const estimatedReturns = totalValue - investedAmount;

    setCalculatedValues({
      investedAmount: Math.round(investedAmount),
      estimatedReturns: Math.round(estimatedReturns),
      totalValue: Math.round(totalValue),
    });
  };

  const chartOptions = {
    chart: {
      type: "pie" as "pie",
    },
    labels: ["Invested Amount", "Est. Returns"],
    colors: ["#64748b", "#fc3c61"],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value: number) => `$${value.toLocaleString()}`,
      },
    },
  };

  const chartSeries = [
    calculatedValues.investedAmount,
    calculatedValues.estimatedReturns,
  ];

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-10 py-8 md:py-10">
        <h1 className={title({ boldness: "bold" })}>
          Mutual Fund{" "}
          <text className={title({ color: "pink", boldness: "bold" })}>
            Calculator
          </text>
        </h1>
        <div className="flex gap-10 w-full">
          <div className="w-[70%] bg-white rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-6">
            <div className="flex ms-4 flex-col gap-4">
              <Tabs
                variant="light"
                onSelectionChange={(key) =>
                  setInvestmentType(Number(key) as 0 | 1)
                }
              >
                <Tab key={0} title="Monthly" />
                <Tab key={1} title="One Time" />
              </Tabs>
              <div className="flex justify-between items-start gap-4">
                <Siders
                  calculatedValues={calculatedValues}
                  investmentType={investmentType}
                  monthlyInvestment={monthlyInvestment}
                  oneTimeInvestment={oneTimeInvestment}
                  returnRate={returnRate}
                  setMonthlyInvestment={setMonthlyInvestment}
                  setOneTimeInvestment={setOneTimeInvestment}
                  setReturnRate={setReturnRate}
                  setTimePeriod={setTimePeriod}
                  timePeriod={timePeriod}
                />
                <DonutChart
                  chartOptions={chartOptions}
                  chartSeries={chartSeries}
                />
              </div>
            </div>
          </div>
          <div className="w-[30%] space-y-4">
            <div className="bg-white flex flex-col gap-4 items-center rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-6">
              <img alt="moneytree" className="w-28" src="cointree.png" />
              <h1 className="font-semibold text-gray-800 text-xl">
                Invest the way you want
              </h1>
              <p className="text-sm text-gray-600">
                Join millions who trust and love Morgenfund{" "}
              </p>
              <Button className="w-11/12 bg-gradient-to-r from-[#E7649C] to-[#fc3c61] text-white ">
                EXPLORE PRODUCTS
              </Button>
            </div>
            <div className="bg-white rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] flex flex-col ">
              <h2 className="border-b-2 p-3 text-gray-800 font-semibold">
                Popular Calculators
              </h2>
              <ul className="list-disc list-inside text-gray-800">
                <ul className="border-b-2 p-3 hover:bg-primary-100/70">
                  Mutual Funds calculator
                </ul>
                <ul className="border-b-2 p-3 hover:bg-primary-100/70">
                  SIP calculator
                </ul>
                <ul className="border-b-2 p-3 hover:bg-primary-100/70">
                  Lumpsum calculator
                </ul>
                <ul className="border-b-2 p-3 hover:bg-primary-100/70">
                  Income Tax calculator
                </ul>
                <ul className="border-b-2 p-3 hover:bg-primary-100/70">
                  PPF calculator
                </ul>
                <ul className="p-3 hover:bg-primary-100/70 rounded-b-lg">
                  FD calculator
                </ul>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
