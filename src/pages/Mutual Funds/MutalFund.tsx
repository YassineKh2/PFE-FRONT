import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import Banner from "@/components/MutualFunds/Banner";
import FundInfo from "@/components/MutualFunds/FundInfo";
import FundManagment from "@/components/MutualFunds/FundManagment";
import HoldingList from "@/components/MutualFunds/HoldingList";
import Investement from "@/components/MutualFunds/Investement";
import Linebar from "@/components/MutualFunds/Linebar";
import navDetails from "@/database/HistoricalNAV.json";
import mfDetails from "@/database/MutualFunds.json";
import DefaultLayout from "@/layouts/default";
import { useAuth } from "@/providers/AuthProvider";
import { GetUserInformation, UpdateSystemPreferences } from "@/services/User";
import { Fund } from "@/types/MutualFunds";
import { SystemPoints, User } from "@/types/User";
import "chart.js/auto";

function MutalFund() {
  const [mutualFund, setMutualFund] = useState<any>();
  const [AsManager, setAsManager] = useState(false);
  const [mutualFundDetails, setMutualFundDetails] = useState<Fund>({} as Fund);
  const [ClientData, setClientData] = useState<User>({} as User);

  const { currentUser } = useAuth();

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get("clientId") || "";
  const managerId = searchParams.get("managerId");

  useEffect(() => {
    if (
      managerId &&
      clientId &&
      currentUser.role === "manager" &&
      managerId === currentUser.uid
    ) {
      setAsManager(true);
      GetUserInformation(clientId).then((data) => {
        setClientData(data);
      });
    }
  }, [currentUser, managerId, clientId]);

  useEffect(() => {
    if (!id) {
      return;
    }
    const navDetail = Object.entries(navDetails.historicalNAV).find(
      ([key]) => key === id,
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

      UpdateSystemPreferences(currentUser.uid, PointsToAdd);
    }, 60000);

    return () => clearTimeout(timer);
  }, [mutualFundDetails]);

  return (
    <>
      {AsManager && <Banner name={ClientData.name} />}
      <DefaultLayout>
        {!mutualFund ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col  justify-center gap-4 py-8 md:py-10">
            <FundInfo
              AsManager={AsManager}
              ClientId={clientId}
              mutualFund={mutualFundDetails}
            />
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
                <Investement
                  AsManager={AsManager}
                  ClientId={clientId}
                  mutualFund={mutualFundDetails}
                />
              </div>
            </div>
          </div>
        )}
      </DefaultLayout>
    </>
  );
}

export default MutalFund;
