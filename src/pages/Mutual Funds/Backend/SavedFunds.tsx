import { Navigate } from "react-router-dom";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { cn } from "@heroui/theme";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { Tab, Tabs } from "@heroui/tabs";
import { useEffect, useState } from "react";

import { SearchIcon } from "@/components/icons";
import { title, subtitle } from "@/components/primitives";
import { useAuth } from "@/providers/AuthProvider";
import { Fund } from "@/types/MutualFunds";
import funds from "@/database/MutualFunds.json";
import DefaultLayout from "@/layouts/dashboard";

function SavedFunds() {
  const [MutualFunds, setMutualFunds] = useState<Fund[]>([]);
  const [AllMutualFunds, setAllMutualFunds] = useState<Fund[]>([]);
  const [ReturnRates, setReturnRates] = useState<{ [key: string]: string }>({});
  const [SearchFund, setSearchFund] = useState<string>("");
  const { userLoggedIn, currentUser } = useAuth();

  const loadSavedFunds = () => {
    if (!currentUser) return;
    const userId = currentUser.uid;
    const savedFunds = localStorage.getItem(`savedFunds_${userId}`);
    const fundisins: string[] = savedFunds ? JSON.parse(savedFunds) : [];
    //@ts-ignore
    const savedFundsData = funds.funds.filter((fund: Fund) =>
      fundisins.includes(fund.isin),
    );

    //@ts-ignore
    setMutualFunds(savedFundsData);
    //@ts-ignore
    setAllMutualFunds(savedFundsData);
  };

  useEffect(() => {
    loadSavedFunds();
  }, [currentUser]);

  useEffect(() => {
    const filteredFunds = AllMutualFunds.filter((fund) =>
      fund.name.toLowerCase().includes(SearchFund.toLowerCase()),
    );

    setMutualFunds(filteredFunds);
  }, [SearchFund, AllMutualFunds]);

  function RemoveFund(isin: string) {
    const userId = currentUser?.uid;
    const savedFunds = localStorage.getItem(`savedFunds_${userId}`);
    let fundisins = savedFunds ? JSON.parse(savedFunds) : [];

    fundisins = fundisins.filter((fundisin: string) => fundisin !== isin);
    localStorage.setItem(`savedFunds_${userId}`, JSON.stringify(fundisins));

    setMutualFunds((prevFunds) =>
      prevFunds.filter((fund) => fund.isin !== isin),
    );
    setAllMutualFunds((prevFunds) =>
      prevFunds.filter((fund) => fund.isin !== isin),
    );
  }

  function handleTabChange(isin: string, key: string) {
    setReturnRates((prevRates) => ({
      ...prevRates,
      [isin]: key,
    }));
  }

  return (
    <>
      {!userLoggedIn && <Navigate replace={true} to={"/"} />}

      <DefaultLayout>
        <div className="flex items-start justify-between w-full">
          <h1 className={title({ size: "sm", boldness: "bold" })}>
            Saved Funds
          </h1>
          <Input
            aria-label="Search"
            className="max-w-xs hidden lg:inline-block"
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm",
            }}
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
            value={SearchFund}
            onChange={(e) => setSearchFund(e.target.value)}
          />
        </div>
        <div className={subtitle({ size: "xs" }) + " text-gray-400"}>
          View and manage your saved mutual funds here. Remove any funds you no
          longer want to monitor.
        </div>

        {MutualFunds.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center">
            <span className={title({ size: "sm" })}>No funds found </span>
            <img
              alt="sad"
              className="size-96"
              src="/undraw_heartbroken_ocfa.svg"
            />
          </div>
        ) : (
          <>
            {MutualFunds.map((fund) => (
              <div
                key={fund.isin}
                className="mt-5 flex flex-col gap-2 max-w-6xl"
              >
                <Card>
                  <CardHeader className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Icon
                        className="text-success-800 bg-success-200 rounded-2xl "
                        height="48"
                        icon="healthicons:low-income-level"
                        width="48"
                      />
                      <div>
                        <p className="text-tiny uppercase font-bold">
                          {fund.category} Fund
                        </p>

                        <Chip
                          classNames={{
                            content: "font-semibold text-[0.65rem]",
                          }}
                          color="warning"
                          radius="sm"
                          size="sm"
                          variant="flat"
                        >
                          {fund.rating}
                        </Chip>
                      </div>
                    </div>
                    <Button
                      isIconOnly
                      className="bg-white dark:bg-[#18181B] hover:bg-gray-200"
                    >
                      <Icon
                        color="#fdba74"
                        height="24"
                        icon="material-symbols:star-rounded"
                        width="24"
                        onClick={() => {
                          RemoveFund(fund.isin);
                        }}
                      />
                    </Button>
                  </CardHeader>
                  <CardBody>
                    <Divider className="mb-5" />
                    <div className="flex items-center">
                      <p className={subtitle()}>{fund.name}</p>

                      <Chip
                        className={cn("md:absolute right-4 top")}
                        classNames={{
                          content: "font-semibold text-[0.65rem]",
                        }}
                        color="success"
                        radius="lg"
                        size="lg"
                        startContent={
                          <Icon
                            height={12}
                            icon={"solar:arrow-right-up-linear"}
                            width={12}
                          />
                        }
                        variant="flat"
                      >
                        12.5%
                      </Chip>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between text-sm gap-6">
                      <div className="md:w-screen">
                        <div className="flex justify-between gap-2 mt-4 overflow-x-auto">
                          <p>Fund Managers :</p>
                          <p className="font-semibold max-h-2 max-w-32">
                            {fund.fund_manager ? fund.fund_manager : "-"}
                          </p>
                        </div>
                        <hr className="my-2 border-dotted border-1" />
                        <div className="flex justify-between gap-2 mt-4">
                          <p>Rating:</p>
                          <p className="font-semibold">
                            {" "}
                            {fund.rating
                              ? "★".repeat(fund.rating) +
                                "☆".repeat(5 - fund.rating)
                              : "-"}
                          </p>
                        </div>
                        <hr className="my-2 border-dotted border-1" />
                        <div className="flex justify-between gap-2 mt-4">
                          <p>Fund Type :</p>
                          <p className="font-semibold">{fund.category}</p>
                        </div>
                        <hr className="my-2 border-dotted border-1" />
                        <div className="flex justify-between gap-2 mt-4">
                          <p>Fund Sector :</p>
                          <p className="font-semibold">{fund.sector}</p>
                        </div>
                        <hr className="my-2 border-dotted border-1" />
                      </div>
                      <div className="md:w-screen">
                        <div className="flex justify-between gap-2 mt-4">
                          <p>Start Date :</p>
                          <p className="font-semibold">
                            {fund.start_date || "-"}
                          </p>
                        </div>
                        <hr className="my-2 border-dotted border-1" />
                        <div className="flex justify-between gap-2 mt-4">
                          <p>Maturity Type:</p>
                          <p className="font-semibold">
                            {fund.maturity_type || "-"}
                          </p>
                        </div>
                        <hr className="my-2 border-dotted border-1" />
                        <div className="flex justify-between gap-2 mt-4">
                          <p>Code :</p>
                          <p className="font-semibold">{fund.isin}</p>
                        </div>
                        <hr className="my-2 border-dotted border-1" />
                        <div className="flex justify-between gap-2 mt-4">
                          <p>Volatility :</p>
                          <p className="font-semibold">
                            {fund.volatility || "-"}
                          </p>
                        </div>
                        <hr className="my-2 border-dotted border-1" />
                      </div>
                      <div className="md:w-screen">
                        <div className="flex justify-between gap-2 mt-4">
                          <p>SIP Available:</p>
                          <p className="font-semibold">
                            {fund.sip_available || "-"}
                          </p>
                        </div>
                        <hr className="my-2 border-dotted border-1" />
                        <div className="flex justify-between gap-2 mt-4">
                          <p>Min SIP:</p>
                          <p className="font-semibold">
                            {fund.minInvestment || "-"}
                          </p>
                        </div>
                        <hr className="my-2 border-dotted border-1" />
                        <div className="flex justify-between gap-2 mt-4">
                          <p>Max SIP Gap :</p>
                          <p className="font-semibold">
                            {fund.maxInvestment || "-"}
                          </p>
                        </div>
                        <hr className="my-2 border-dotted border-1" />
                        <div className="flex justify-between gap-2 mt-4">
                          <p>SIP Multiplier :</p>
                          <p className="font-semibold">
                            {fund.sip_multiplier || "-"}
                          </p>
                        </div>
                        <hr className="my-2 border-dotted border-1" />
                      </div>
                      <div className="md:w-screen">
                        <div className="flex justify-between gap-2 mt-4">
                          <p>Lock in period :</p>
                          <p className="font-semibold">
                            {fund.lockInPeriod || "-"}
                          </p>
                        </div>
                        <hr className="my-2 border-dotted border-1" />
                        <div className="flex justify-between gap-2 mt-4">
                          <p>Lump Available :</p>
                          <p className="font-semibold">
                            {fund.lump_available || "-"}
                          </p>
                        </div>
                        <hr className="my-2 border-dotted border-1" />
                        <div className="flex justify-between gap-2 mt-4">
                          <p>Redemption Allowed :</p>
                          <p className="font-semibold">
                            {fund.redemptionFrequency || "-"}
                          </p>
                        </div>
                        <hr className="my-2 border-dotted border-1" />
                        <div className="flex justify-between gap-2 mt-4">
                          <p>Tax Period :</p>
                          <p className="font-semibold">
                            {fund.tax_period || "-"}
                          </p>
                        </div>
                        <hr className="my-2 border-dotted border-1" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <div className="flex flex-col md:flex-row justify-evenly gap-4 py-5">
                  <Card className="md:w-screen border border-transparent dark:border-default-100">
                    <div className="flex p-4">
                      <div className="flex flex-col gap-y-2">
                        <dt className="text-small font-medium text-default-500">
                          Nav Price
                        </dt>
                        <dd className="text-2xl font-semibold text-default-700">
                          {fund.latestnav}$
                        </dd>
                      </div>
                      <Chip
                        className={cn("absolute right-4 bottom-4")}
                        classNames={{
                          content: "font-medium text-[0.65rem]",
                        }}
                        color={"danger"}
                        radius="sm"
                        size="sm"
                        startContent={
                          <Icon
                            height={12}
                            icon={"solar:arrow-right-down-linear"}
                            width={12}
                          />
                        }
                        variant="light"
                      />
                    </div>
                  </Card>
                  <Card className="md:w-screen border border-transparent dark:border-default-100">
                    <div className="flex p-4">
                      <div className="flex flex-col gap-y-2">
                        <dt className="text-small font-medium text-default-500">
                          AUM
                        </dt>
                        <dd className="text-2xl font-semibold text-default-700">
                          {fund.fundSize}M
                        </dd>
                      </div>
                      <Chip
                        className={cn("absolute right-4 bottom-4")}
                        classNames={{
                          content: "font-medium text-[0.65rem]",
                        }}
                        color={"warning"}
                        radius="sm"
                        size="sm"
                        startContent={
                          <Icon
                            height={12}
                            icon={"solar:arrow-right-linear"}
                            width={12}
                          />
                        }
                        variant="light"
                      >
                        0.01%
                      </Chip>
                    </div>
                  </Card>
                  <Card className="md:w-screen border border-transparent dark:border-default-100">
                    <div className="flex p-4">
                      <div className="flex flex-col gap-y-2">
                        <dt className="text-small font-medium text-default-500">
                          Expense Ratio
                        </dt>
                        <dd className="text-2xl font-semibold text-default-700">
                          {fund.expense_ratio}%
                        </dd>
                      </div>
                      <Icon
                        className="text-warning absolute right-4 "
                        icon="icon-park-outline:expenses"
                        width={20}
                      />
                    </div>
                  </Card>
                  <Card className="md:w-screen border border-transparent dark:border-default-100">
                    <div className="flex p-4">
                      <div className="flex flex-col gap-y-2">
                        <div className="flex items-center gap-6">
                          <dt className="text-small font-medium text-default-500">
                            Returns
                          </dt>
                          <Tabs
                            aria-label={"Return rate for " + fund.isin}
                            className="absolute right-4"
                            defaultSelectedKey={"0" + fund.isin}
                            disabledKeys={
                              new Set(
                                [
                                  !fund.returns["1Y"] && "1" + fund.isin,
                                  !fund.returns["3Y"] && "2" + fund.isin,
                                  !fund.returns["5Y"] && "3" + fund.isin,
                                ].filter((key): key is string => Boolean(key)),
                              )
                            }
                            radius="lg"
                            selectedKey={
                              ReturnRates[fund.isin] || "0" + fund.isin
                            }
                            size="sm"
                            onSelectionChange={(key) => {
                              handleTabChange(fund.isin, String(key));
                            }}
                          >
                            <Tab key={"1" + fund.isin} title="1Y" />
                            <Tab key={"2" + fund.isin} title="3Y" />
                            <Tab key={"3" + fund.isin} title="5Y" />
                          </Tabs>
                        </div>
                        <dd className="text-2xl font-semibold text-default-700">
                          {ReturnRates[fund.isin]?.startsWith("0")
                            ? fund.returns["1Y"]
                            : ReturnRates[fund.isin]?.startsWith("1")
                              ? fund.returns["3Y"]
                              : ReturnRates[fund.isin]?.startsWith("2")
                                ? fund.returns["3Y"]
                                : fund.returns["5Y"]}
                        </dd>
                      </div>
                      <Chip
                        className={cn("absolute right-4 bottom-4")}
                        classNames={{
                          content: "font-medium text-[0.65rem]",
                        }}
                        color={"success"}
                        radius="sm"
                        size="sm"
                        startContent={
                          <Icon
                            height={12}
                            icon={"solar:arrow-right-up-linear"}
                            width={12}
                          />
                        }
                        variant="light"
                      >
                        0.54%
                      </Chip>
                    </div>
                  </Card>
                </div>
                <Divider className="my-5" />
              </div>
            ))}
          </>
        )}
      </DefaultLayout>
    </>
  );
}

export default SavedFunds;
