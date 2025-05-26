import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MFList from "../database/MutualFunds.json";

import DefaultLayout from "@/layouts/default";
import { title, subtitle } from "@/components/primitives";

export default function HomePage() {
  const [MutualFunds, setMutualFunds] = useState(MFList.funds);
  const [SelectedFund, setSelectedFund] = useState<string | undefined>();

  const navigate = useNavigate();

  function SearchFund(MFid: string | undefined): void {
    setSelectedFund(MFid);
    if (MFid) {
      navigate(`/fund/${MFid}`);
    }
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-4xl text-center justify-center">
          <span className={title({ size: "lg", boldness: "bold" })}>
            Search a&nbsp;
          </span>
          <span
            className={title({ color: "pink", size: "xl", boldness: "bold" })}
          >
            Mutual Fund
          </span>
          <br />
          <span className={title({ size: "lg", boldness: "bold" })}>
            and start trading
          </span>
          <div className={subtitle({ class: "mt-4" })}>All in one place</div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <Autocomplete
            isVirtualized
            className="max-w-xs md:max-w-lg w-screen"
            label="Search a mutual fund"
            listboxProps={{
              emptyContent: "No results found",
            }}
            selectedKey={SelectedFund}
            variant="bordered"
            onSelectionChange={(key) => SearchFund(key as string | undefined)}
          >
            {MutualFunds?.map((MF) => (
              <AutocompleteItem key={MF.isin}>{MF.name}</AutocompleteItem>
            ))}
          </Autocomplete>
          <p className="text-xs text-gray-600">
            Not Enough ? Get More advanced Searchs
            <Link className="text-primary-500" to="/filter">
              {" "}
              Here
            </Link>
          </p>
        </div>
      </section>
    </DefaultLayout>
  );
}
