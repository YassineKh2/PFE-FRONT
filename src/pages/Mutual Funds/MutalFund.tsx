import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "chart.js/auto";
import Linebar from "@/components/MutualFunds/Linebar";
import FundInfo from "@/components/MutualFunds/FundInfo";
import Investement from "@/components/MutualFunds/Investement";
import HoldingList from "@/components/MutualFunds/HoldingList";
import navDetails from "@/database/HistoricalNAV.json";
import mfDetails from "@/database/MutualFunds.json";
import { Fund } from "@/types/MutualFunds";
import { SystemPoints } from "@/types/User";
import { UpdateSystemPreferences } from "@/services/User";
import { useAuth } from "@/providers/AuthProvider";
import FundManagment from "@/components/MutualFunds/FundManagment";

function MutalFund() {
  const { id } = useParams();
  const [mutualFund, setMutualFund] = useState<any>();
  const [mutualFundDetails, setMutualFundDetails] = useState<Fund>({} as Fund);
  const { currentUser } = useAuth();
  useEffect(() => {
    if (!id) {
      return;
    }
    const navDetail = Object.entries(navDetails.historicalNAV).find(
      ([key]) => key === id
    )?.[1];
    if (navDetail) {
      setMutualFund(navDetail);
    }

    const mfDetail = mfDetails.funds.find((mf) => mf.isin === id);
    if (mfDetail) {
      //@ts-ignore
      setMutualFundDetails(mfDetail);
    }
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const PointsToAdd: SystemPoints = {
        method: "remove",
        amount: 1,
        asset: mutualFundDetails.category.toLowerCase(),
        sector: mutualFundDetails.sector.toLowerCase(),
      };
      // UpdateSystemPreferences(currentUser.uid, PointsToAdd);
    }, 60000);
    return () => clearTimeout(timer);
  }, [mutualFundDetails]);

  return (
    <DefaultLayout >
      {!mutualFund ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col  justify-center gap-4 py-8 md:py-10">
          <FundInfo mutualFund={mutualFundDetails} />
          <div className="flex md:flex-row justify-between gap-4 ">
            <div className="flex flex-col w-[70%] gap-4">
              <Linebar
                mutualFund={mutualFund}
                mutualFundDetails={mutualFundDetails}
              />
              <FundManagment mutualFund={mutualFundDetails} />
              <HoldingList />
            </div>
            <div className="w-[30%]">
              <Investement mutualFund={mutualFundDetails} />
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}

export default MutalFund;
