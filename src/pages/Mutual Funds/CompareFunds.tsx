import { subtitle, title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Fund } from "@/types/MutualFunds";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MFList from "../../database/MutualFunds.json"


function CompareFunds() {
  const [FirstFund, setFirstFund] = useState({} as Fund);

   const [MutualFunds, setMutualFunds] = useState<>(MFList.funds);

  const navigate = useNavigate();

  function SearchFund(MFid:string | undefined): void {
    setFirstFund(MutualFunds);
  }


  return (
    <DefaultLayout className="bg-gray-100">
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
        <div className="flex flex-col justify-between w-full gap-6">
          <div className="flex w-full">
            <div className="flex flex-col">
              <p className="font-semibold">Select First Fund</p>
                <Autocomplete
            className="max-w-xs md:max-w-lg w-screen"
            label="Search a mutual fund"
            variant="bordered"
            isVirtualized
            selectedKey={FirstFund}
            onSelectionChange={(key) => SearchFund(key as string | undefined)}
            listboxProps={{
              emptyContent: "No results found",
            }}
          >
            {MutualFunds?.map((MF) => (
              <AutocompleteItem key={MF.isin}>
                {MF.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
            </div>
            <div></div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

export default CompareFunds;
