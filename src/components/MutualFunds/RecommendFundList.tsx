import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { funds as fakeFundsData } from "@/database/MutualFunds.json";
import { rankFundsComposite } from "@/Helpers/RecommendMF";
import { Fund } from "@/types/MutualFunds";
import {
  AdditionalInformationFormSchemaType,
  ExperienceFormSchemaType,
  FinancialFormSchemaType,
  PreferencesFormSchemaType,
} from "@/types/Onbording";
import { SearchIcon } from "../icons";
import { Kbd } from "@heroui/kbd";
import { Input } from "@heroui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import { useAuth } from "@/providers/AuthProvider";
import { getUserPreferences } from "@/Helpers/Prefrences";

const MutualFunds = ({ data }: { data: Fund[] }) => {
  return (
    <div>
      <Table hideHeader aria-label="Table">
        <TableHeader>
          <TableColumn width={1}>Fund</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Returns</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((fund, index) => (
            <TableRow
              key={index}
              className=" border-b-1 border-dashed group transform transition-all duration-300 hover:scale-[101%] hover:cursor-pointer"
            >
              <TableCell>
                <div className="space-y-2 py-3">
                  <p className="font-semibold text-gray-800 group-hover:text-primary-500 group-hover:underline">
                    {fund.name}
                  </p>
                  <div className="flex gap-2 text-gray-500 text-xs">
                    <p> {fund.amc} ●</p>
                    <p>{fund.risk} Risk ●</p>
                    <p> {fund.rating}★ ●</p>
                    <p> {fund.volatility}%</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-2 hidden lg:block">
                  <p className="font-semibold text-gray-800 group-hover:text-primary-500 group-hover:underline">
                    {fund.category} | {fund.sector}
                  </p>
                  <div className="flex gap-2 text-gray-500 text-xs">
                    <p className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="#6b7280"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        >
                          <path d="M8.487 21h7.026a4 4 0 0 0 3.808-5.224l-1.706-5.306A5 5 0 0 0 12.855 7h-1.71a5 5 0 0 0-4.76 3.47l-1.706 5.306A4 4 0 0 0 8.487 21M15 3q-1 4-3 4T9 3zm-3 11H9" />
                          <path d="M14 11.172a3 3 0 1 0 0 5.656" />
                        </g>
                      </svg>
                      {fund.taxEfficiencyScore} ●
                    </p>
                    <p> {fund.fundStructure} ●</p>
                    <p> {fund.exitLoad} ●</p>
                    <p> {fund.redemptionFrequency} </p>
                    {fund.lockInPeriod !== 0 && (
                      <p className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#6b7280"
                            d="M12 17a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2m6 3V10H6v10zm0-12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10c0-1.11.89-2 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"
                          />
                        </svg>
                        {fund.lockInPeriod}M
                      </p>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="md:flex gap-3 lg:gap-0 justify-between hidden">
                  <div className="flex flex-col items-center ">
                    <p className="font-semibold text-gray-800">
                      {fund.returns["1Y"]}
                    </p>
                    <p className="text-gray-600 text-xs">1Y</p>
                  </div>
                  <div className="flex flex-col items-center ">
                    <p className="font-semibold text-gray-800">
                      {fund.returns["3Y"]}
                    </p>
                    <p className="text-gray-600 text-xs">3Y</p>
                  </div>
                  <div className="flex flex-col items-center ">
                    <p className="font-semibold text-gray-800">
                      {fund.returns["5Y"]}
                    </p>
                    <p className="text-gray-600 text-xs">5Y</p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

function RecommendFundList() {
  const [filteredFunds, setFilteredFunds] = useState<Fund[]>(
    //@ts-ignore
    fakeFundsData as Fund[]
  );
  const navigate = useNavigate();
  const [SearchFund, setSearchFund] = useState<string>("");
  const [hasData, setHasData] = useState(false);
  const { userLoggedIn,currentUser } = useAuth();
  

  const [experienceData, setExperienceData] = useState<ExperienceFormSchemaType>();
  const [preferencesData, setPreferencesData] = useState<PreferencesFormSchemaType>();
  const [FinancialData, setFinancialData] = useState<FinancialFormSchemaType>();
  const [AdditionalInformationData, setAdditionalInformationData] = useState<AdditionalInformationFormSchemaType>();

  useEffect(() => {
    const getData = async () => {
      const data = await getUserPreferences(currentUser.uid);
      setExperienceData(data[0].experienceData);
      setPreferencesData(data[0].preferencesData);
      setFinancialData(data[0].financialData);
      setAdditionalInformationData(data[0].additionalInformationData);
      setHasData(true);
    }
    getData();
    

  }, []);


  useEffect(() => {
        
    if (!experienceData) return;
    if (!preferencesData) return;
    if (!FinancialData) return;
    if (!AdditionalInformationData) return;

    
   

    const funds = rankFundsComposite(
      filteredFunds,
      experienceData,
      preferencesData,
      FinancialData,
      AdditionalInformationData.sectorsRestrictions
    );
  
    setFilteredFunds(funds);
  }, [hasData]);

  return (
    <div className="mt-14 w-full space-y-5">
      {userLoggedIn ? (
        <>
          <div className="flex justify-between items-center">
            <Input
              aria-label="Search"
              classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
              }}
              value={SearchFund}
              onChange={(e) => setSearchFund(e.target.value)}
              className="max-w-xs hidden lg:inline-block"
              endContent={
                <Kbd className="hidden lg:inline-block" keys={["command"]}>
                  M
                </Kbd>
              }
              labelPlacement="outside"
              placeholder="Search..."
              startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
              }
              type="search"
            />
            <p className="text-gray-500 text-sm">
              {filteredFunds.length} funds found
            </p>
          </div>
          <MutualFunds data={filteredFunds as Fund[]} />
        </>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center h-full w-full">
          <p className="text-gray-500 text-md">It looks like you still haven't completed your onboarding !</p>
            <Button
            color="primary"
            onPress={() => {navigate("/Onboarding")}} 
>
            Complete it here.
            </Button>
        </div>
      )}
    </div>
  );
}

export default RecommendFundList;
