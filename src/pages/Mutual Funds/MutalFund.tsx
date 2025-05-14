import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "chart.js/auto";
import Linebar from "@/components/MutualFunds/Linebar";
import Cards from "@/components/MutualFunds/Cards";
import Estimator from "@/components/MutualFunds/Estimator";
import HoldingList from "@/components/MutualFunds/HoldingList";
import navDetails from "@/database/HistoricalNAV.json";
import mfDetails from "@/database/MutualFunds.json";
import { Fund } from "@/Helpers/FilterFunds";

function MutalFund() {
  const { id } = useParams();
  const [mutualFund, setMutualFund] = useState<any>();
  const [mutualFundDetails, setMutualFundDetails] = useState<Fund>({} as Fund);
  useEffect(() => {
    if (!id) {
      return;
    }
    const navDetail = Object.entries(navDetails.historicalNAV).find(([key]) => key === id)?.[1];
    if (navDetail) {
      setMutualFund(navDetail);
    }

    const mfDetail = mfDetails.funds.find((mf) => mf.isin === id);
    if (mfDetail) {
      //@ts-ignore
      setMutualFundDetails(mfDetail);
    }

  }, [id]);

  return (
    <DefaultLayout>
      {!mutualFund ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col  justify-center gap-4 py-8 md:py-10">
          <Cards mutualFund={mutualFundDetails} />
          <Linebar mutualFund={mutualFund} mutualFundDetails={mutualFundDetails} />
          <div className='flex flex-col md:flex-row justify-between gap-4 '>
            <Estimator mutualFund={mutualFundDetails}/>
            <HoldingList />
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}

export default MutalFund;
