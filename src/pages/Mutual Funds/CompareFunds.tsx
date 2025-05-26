import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MFList from "../../database/MutualFunds.json";

import { Fund } from "@/types/MutualFunds";
import DefaultLayout from "@/layouts/default";
import { subtitle, title } from "@/components/primitives";
import { SearchIcon } from "@/components/icons";
import Cards from "@/components/MutualFunds/Cards";
import Linebar from "@/components/MutualFunds/Linebar";
import navDetails from "@/database/HistoricalNAV.json";

function CompareFunds() {
  const [FirstFund, setFirstFund] = useState({} as Fund);
  const [SecondFund, setSecondFund] = useState({} as Fund);

  const [FirstFundNavPrices, setFirstFundNavPrices] = useState<any>();
  const [SecondFundNavPrices, setSecondFundNavPrices] = useState<any>();

  const navigate = useNavigate();

  const MutualFunds = MFList.funds.map((fund) => ({
    ...fund,
    turnover: Number(fund.turnover),
  })) as Fund[];

  const historicalNAVs = navDetails.historicalNAV;

  useEffect(() => {
    const fund = localStorage.getItem(`CompareFunds`);

    if (!fund) return;

    SearchFirstFund(fund);
    localStorage.removeItem(`CompareFunds`);
  }, []);

  function SearchFirstFund(MFid: string | undefined): void {
    const fund = MutualFunds.find((fund) => fund.isin === MFid);

    if (!fund) return;

    setFirstFund(fund);

    const navDetail = Object.entries(historicalNAVs).find(
      ([key]) => key === fund.isin,
    )?.[1];

    if (navDetail) {
      setFirstFundNavPrices(navDetail);
    }
  }

  function SearchSecondFund(MFid: string | undefined): void {
    const fund = MutualFunds.find((fund) => fund.isin === MFid);

    if (!fund) return;
    setSecondFund(fund);

    const navDetail = Object.entries(historicalNAVs).find(
      ([key]) => key === fund.isin,
    )?.[1];

    if (navDetail) {
      setSecondFundNavPrices(navDetail);
    }
  }

  return (
    <DefaultLayout fullWidth>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex flex-col items-center">
          <h1 className={title({ size: "lg", boldness: "bold" })}>
            Compare{" "}
            <text
              className={title({ size: "lg", color: "pink", boldness: "bold" })}
            >
              Mutual Funds
            </text>
          </h1>
          <p className={subtitle() + " text-center"}>
            Select two funds to compare their performance and details side by
            side
          </p>
        </div>
        <div className="flex flex-col justify-between w-full gap-6 mt-4">
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <p className="font-semibold">Select First Fund</p>
              <Autocomplete
                isVirtualized
                className="max-w-xs md:max-w-lg w-screen"
                label="Search a mutual fund"
                listboxProps={{
                  emptyContent: "No results found",
                }}
                selectedKey={FirstFund.isin}
                variant="bordered"
                onSelectionChange={(key) =>
                  SearchFirstFund(key as string | undefined)
                }
              >
                {MutualFunds?.map((MF) => (
                  <AutocompleteItem key={MF.isin}>{MF.name}</AutocompleteItem>
                ))}
              </Autocomplete>
            </div>

            <div className="flex flex-col">
              <p className="font-semibold ">Select Second Fund</p>
              <Autocomplete
                isVirtualized
                className="max-w-xs md:max-w-lg w-screen"
                label="Search a mutual fund"
                listboxProps={{
                  emptyContent: "No results found",
                }}
                selectedKey={SecondFund.isin}
                variant="bordered"
                onSelectionChange={(key) =>
                  SearchSecondFund(key as string | undefined)
                }
              >
                {MutualFunds?.map((MF) => (
                  <AutocompleteItem key={MF.isin}>{MF.name}</AutocompleteItem>
                ))}
              </Autocomplete>
            </div>
          </div>

          {!FirstFund ||
          !SecondFund ||
          !FirstFundNavPrices ||
          !SecondFundNavPrices ? (
            <NoFunds />
          ) : (
            <div className="w-full flex flex-col gap-6">
              <div className="space-y-4">
                <p className="font-semibold text-xl">Key Metrics</p>
                <div className="flex justify-between gap-12">
                  <div className="w-full space-y-4">
                    <p className="font-semibold">{FirstFund.name}</p>
                    <Cards mutualFund={FirstFund} />
                  </div>
                  <div className="w-full space-y-4">
                    <p className="font-semibold">{SecondFund.name}</p>
                    <Cards mutualFund={SecondFund} />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <p className="font-semibold text-xl">Performance Comparison</p>
                <div className="flex justify-between gap-12">
                  <Linebar
                    mutualFund={FirstFundNavPrices}
                    mutualFundDetails={FirstFund}
                  />
                  <Linebar
                    mutualFund={SecondFundNavPrices}
                    mutualFundDetails={SecondFund}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-semibold text-xl">
                  Risk & Additional Information
                </p>
                <div className="flex justify-between gap-12">
                  <div className="w-full gap-3 flex flex-col bg-white rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4">
                    <p className="font-semibold">{FirstFund.name}</p>
                    <div className="flex flex-col">
                      <p className="text-gray-500">Risk Rating</p>
                      <p className="font-semibold">{FirstFund.risk}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-500">Volatility</p>
                      <p className="font-semibold">{FirstFund.volatility}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-500">Fund Manager</p>
                      <p className="font-semibold">{FirstFund.fund_manager}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-500">Launch Date</p>
                      <p className="font-semibold">{FirstFund.start_date}</p>
                    </div>
                  </div>
                  <div className="w-full gap-3 flex flex-col bg-white rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4">
                    <p className="font-semibold">{SecondFund.name}</p>
                    <div className="flex flex-col">
                      <p className="text-gray-500">Risk Rating</p>
                      <p className="font-semibold">{SecondFund.risk}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-500">Volatility</p>
                      <p className="font-semibold">{SecondFund.volatility}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-500">Fund Manager</p>
                      <p className="font-semibold">{SecondFund.fund_manager}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-500">Launch Date</p>
                      <p className="font-semibold">{SecondFund.start_date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}

export default CompareFunds;

const NoFunds = () => {
  return (
    <div className="w-full gap-3 flex flex-col items-center bg-white rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-8">
      <div className="bg-gray-100 p-4 rounded-full text-gray-600">
        <SearchIcon height={30} width={30} />
      </div>
      <p className="font-semibold">Select Funds to Compare</p>
      <p className="text-gray-500">
        Please select two mutual funds from the dropdown menus above to view a
        detailed side-by-side comparison.
      </p>
    </div>
  );
};
