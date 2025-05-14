import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MFList from "../database/MutualFunds.json"

export default function HomePage() {
  const [MutualFunds, setMutualFunds] = useState(MFList.funds);
  const [SelectedFund, setSelectedFund] = useState<string | undefined>();

  const navigate = useNavigate();

  function SearchFund(MFid:string | undefined): void {
    setSelectedFund(MFid);
    if (MFid) {
      navigate(`/fund/${MFid}`);
    }
  }


  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title({size:'md'})}>Search a&nbsp;</span>
          <span className={title({ color: "pink",size:'lg' })}>Mutual Fund</span>
          <br />
          <span className={title({size:'md'})}>and start trading</span>
          <div className={subtitle({ class: "mt-4" })}>All in one place</div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <Autocomplete
            className="max-w-xs md:max-w-lg w-screen"
            label="Search a mutual fund"
            variant="bordered"
            isVirtualized
            selectedKey={SelectedFund}
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
          <p className="text-xs text-gray-600">Not Enough ? Get More advanced Searchs 
            <Link to='/filter' className="text-primary-500"> Here</Link>
            </p>
        </div>
      </section>
    </DefaultLayout>
  );
}
