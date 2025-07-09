import { Tab, Tabs } from "@heroui/tabs";
import { useEffect, useState } from "react";
import { Button, Divider, NumberInput } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Icon } from "@iconify/react/dist/iconify.js";

import { Fund } from "@/types/MutualFunds";
import { useAuth } from "@/providers/AuthProvider";
import {
  AddAvailableFunds,
  BuyFunds,
  GetAvailableFunds,
} from "@/services/Deposit";
function Investement({ mutualFund }: { mutualFund: Fund }) {
  const [AmountInvested, setAmountInvest] = useState<number | number[]>(2000);
  const [InvestementType, setInvestementType] = useState<number>(0);
  const [PeriodInvested, setPeriodInvested] = useState<number>(0);
  const [TotalInvestement, setTotalInvestement] = useState<number>(24000);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenBuy,
    onOpen: onOpenBuy,
    onOpenChange: onOpenChangeBuy,
    onClose: onCloseBuy,
  } = useDisclosure();
  const {
    isOpen: isOpenAddFunds,
    onOpen: onOpenAddFunds,
    onOpenChange: onOpenChangeAddFunds,
    onClose: onCloseAddFunds,
  } = useDisclosure();

  const {
    isOpen: isOpenAddFundsModal,
    onOpen: onOpenAddFundsModal,
    onOpenChange: onOpenChangeAddFundsModal,
    onClose: onCloseAddFundsModal,
  } = useDisclosure();
  const [addFundsAmount, setAddFundsAmount] = useState(100);

  const [ApproximatedGain, setApproximatedGain] = useState<{
    gain: number;
    pourcentage: number;
  }>();

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    calculateTotalInvestement();
  }, [AmountInvested, InvestementType, PeriodInvested]);

  useEffect(() => {
    calculateGains();
  }, [TotalInvestement, PeriodInvested]);

  const calculateTotalInvestement = () => {
    let total = 0;

    if (InvestementType === 1) {
      total = AmountInvested as number;
      setTotalInvestement(total);

      return;
    }

    if (PeriodInvested === 0) {
      total = (AmountInvested as number) * 12;
    } else if (PeriodInvested === 1) {
      total = (AmountInvested as number) * 12 * 3;
    } else {
      total = (AmountInvested as number) * 12 * 5;
    }

    setTotalInvestement(total);
  };

  useEffect(() => {
    if (InvestementType) {
      setAmountInvest(20000);
    } else {
      setAmountInvest(2000);
    }
  }, [InvestementType]);

  const calculateGains = () => {
    let total = 0;

    if (!mutualFund) return;
    if (!mutualFund.returns["1Y"]) return;

    if (PeriodInvested === 0) {
      total = TotalInvestement * (getNumber(mutualFund.returns["1Y"]) ?? 0);
    } else if (PeriodInvested === 1) {
      total = TotalInvestement * (getNumber(mutualFund.returns["3Y"]) ?? 0);
    } else {
      total = TotalInvestement * (getNumber(mutualFund.returns["5Y"]) ?? 0);
    }

    const gainPourcentage =
      ((total - (TotalInvestement as number)) / (TotalInvestement as number)) *
      100;

    setApproximatedGain({
      gain: total,
      pourcentage: gainPourcentage,
    });
  };

  const getNumber = (str: string) => {
    const cleaned = str.replace(",", ".").match(/[\d.]+/);

    if (cleaned) return Number(cleaned[0]);
  };

  const CheckDeposit = () => {
    if (!currentUser?.uid || !currentUser?.depositTier) {
      onOpen();

      return;
    }
    onOpenBuy();
  };

  function CheckFunds() {
    GetAvailableFunds(currentUser.uid).then((response) => {
      if (response.data < Number(AmountInvested)) {
        onOpenAddFunds();

        return;
      }
      buyfund();
    });
  }

  function AddFunds() {
    AddAvailableFunds(currentUser.uid, addFundsAmount).then(() => {
      onCloseAddFundsModal();
    });
  }

  function buyfund() {
    const data = {
      isin: mutualFund.isin,
      name: mutualFund.name,
      amount_invested: AmountInvested,
      nav_price: mutualFund.latestnav,
    };

    BuyFunds(currentUser.uid, data).then(() => {
      onCloseBuy();
      navigate("/dashboard/home");
    });
  }

  return (
    <>
      <div className="sticky top-20 self-start space-y-4 bg-white rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-6">
        <p className="font-semibold text-xl">Invest Now</p>
        <Tabs
          fullWidth
          color="primary"
          onSelectionChange={(key) => {
            setInvestementType(Number(key));
          }}
        >
          <Tab key={0} title="Monthy" />
          <Tab key={1} title="One Time" />
        </Tabs>

        <div className="flex flex-col gap-1 justify-center ">
          <p className="text-sm font-semibold">
            {InvestementType === 0 ? "Monthly SIP Amount" : "One Time Amount"}
          </p>
          <div className="flex items-center w-full">
            <NumberInput
              hideStepper
              formatOptions={{
                style: "currency",
                currency: "EUR",
              }}
              minValue={getNumber(mutualFund.minInvestment)}
              size="sm"
              value={AmountInvested as number}
              variant="bordered"
              onChange={(val) => setAmountInvest(Number(val))}
            />
          </div>
          <p className="text-xs text-gray-500">
            Min. {InvestementType === 0 ? "SIP" : "Investment"}:{" "}
            {mutualFund.minInvestment}
          </p>
        </div>

        {/* Period selection */}
        <div className="flex flex-col gap-1 justify-center ">
          <p className="text-sm font-semibold">Investment Period</p>
          <div className="flex gap-2">
            <Button
              color={PeriodInvested === 0 ? "primary" : "default"}
              size="sm"
              onPress={() => setPeriodInvested(0)}
            >
              1 Year
            </Button>
            <Button
              color={PeriodInvested === 1 ? "primary" : "default"}
              size="sm"
              onPress={() => setPeriodInvested(1)}
            >
              3 Years
            </Button>
            <Button
              color={PeriodInvested === 2 ? "primary" : "default"}
              size="sm"
              onPress={() => setPeriodInvested(2)}
            >
              5 Years
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-1 justify-center ">
          <p className="text-sm font-semibold">Summary</p>
          <div className="bg-gray-100 flex flex-col p-4 rounded-md text-sm gap-2">
            <div className="flex justify-between items-center gap-1 ">
              <p className="text-gray-500">Invested Amount</p>
              <p className="font-semibold">
                €{TotalInvestement.toLocaleString()}
              </p>
            </div>
            <div className="flex justify-between items-center gap-1 ">
              <p className="text-gray-500">
                Est. Returns (
                {PeriodInvested === 0
                  ? "1Y"
                  : PeriodInvested === 1
                    ? "3Y"
                    : "5Y"}
                )
              </p>
              <p className="font-semibold text-green-500">
                €
                {ApproximatedGain
                  ? ApproximatedGain.gain.toLocaleString()
                  : "-"}
              </p>
            </div>
            <div className="flex justify-between items-center gap-1 ">
              <p className="text-gray-500">Total Value</p>
              <p className="font-semibold">
                €
                {ApproximatedGain
                  ? (ApproximatedGain.gain + TotalInvestement).toLocaleString()
                  : "-"}
              </p>
            </div>
          </div>
        </div>

        <Button className="w-full" color="primary" onPress={CheckDeposit}>
          Start Investing
        </Button>
        <Divider />
        <div className="flex flex-col gap-4">
          <p className="font-semibold">Simlar Funds</p>
          <div className="flex justify-between text-sm ">
            <div className="flex flex-col gap-1 items-start">
              <Link className="font-semibold hover:text-primary-500" to="">
                ICICI Prudential Bluechip Fund
              </Link>
              <div className="flex justify-center gap-2 text-xs text-gray-500">
                <p>Large Cap</p>
                <p className="text-green-500">+14.2%</p>
              </div>
            </div>
            <Button size="sm" variant="bordered">
              Compare
            </Button>
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex flex-col gap-1 items-start">
              <Link className="font-semibold hover:text-primary-500" to="">
                Axis Midcap Fund
              </Link>
              <div className="flex justify-center gap-2 text-xs text-gray-500">
                <p>Mid Cap</p>
                <p className="text-green-500">+16.2%</p>
              </div>
            </div>
            <Button size="sm" variant="bordered">
              Compare
            </Button>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex flex-col justify-center items-center ">
                <Icon
                  className="text-warning-600 bg-warning-100 rounded-full p-4"
                  height="120"
                  icon="mynaui:danger-hexagon"
                  width="120"
                />
                <h1
                  className={
                    "w-full text-xl my-2 text-default-800 block max-w-full text-center "
                  }
                >
                  You dont have a depost !
                </h1>
              </div>
            </ModalHeader>
            <ModalBody>
              <p className="rounded-full text-center text-default-600">
                Create a depost now and access tens of funds and other exlusive
                features .
              </p>
            </ModalBody>
            <ModalFooter>
              <div className="flex flex-col justify-center items-center gap-3 w-full">
                <Button
                  className="bg-gradient-to-r from-[#E7649C] to-[#fc3c61] text-white w-full"
                  onPress={() => {
                    navigate("/deposit/create");
                  }}
                >
                  Create a depost
                </Button>
                <p className="text-center text-sm">
                  You have an account?&nbsp;
                  <Link className="hover:text-primary-500" to="login">
                    Login
                  </Link>
                </p>
              </div>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenBuy} onOpenChange={onOpenChangeBuy}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h1 className="w-full text-xl mt-2 text-default-800 block max-w-full text-center">
                Confirm Investment
              </h1>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <p className="text-center text-default-600">
                  You are about to invest in{" "}
                  <span className="font-semibold">{mutualFund.name}</span>.
                  Please review the details below.
                </p>
                <div className="bg-gray-100 rounded-md p-4 text-sm flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Investment Type</span>
                    <span className="font-semibold">
                      {InvestementType === 0 ? "Monthly SIP" : "One Time"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Amount</span>
                    <span className="font-semibold">
                      €{(AmountInvested as number).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fund</span>
                    <span className="font-semibold">{mutualFund.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">NAV</span>
                    <span className="font-semibold">
                      {mutualFund.latestnav ? `€${mutualFund.latestnav}` : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-end gap-2 w-full">
                <Button variant="bordered" onPress={onCloseBuy}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    CheckFunds();
                  }}
                >
                  Confirm
                </Button>
              </div>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenAddFunds} onOpenChange={onOpenChangeAddFunds}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex justify-start gap-2 items-center text-danger-500">
                <div className="bg-danger-100 rounded-full p-1">
                  <Icon
                    height="20"
                    icon="solar:danger-circle-linear"
                    width="20"
                  />
                </div>
                <p>Insufficient Funds</p>
              </div>
              <p className="rounded-full text-sm text-gray-600 font-normal">
                You don&apos;t have sufficient funds in your account to complete
                this transaction.
              </p>
            </ModalHeader>
            <ModalBody>
              <div className="bg-warning-100 rounded-md p-4 text-sm flex flex-col gap-2 mb-4 text-warning-700">
                <div className="flex items-center gap-2">
                  <Icon
                    className=" text-warning-600"
                    height="20"
                    icon="mynaui:danger-hexagon"
                    width="20"
                  />

                  <p className="font-semibold  text-warning-800">
                    Transaction Details
                  </p>
                </div>
                <div className="flex justify-between">
                  <span>Required amount</span>
                  <span className="font-semibold">€100</span>
                </div>
                <div className="flex justify-between">
                  <span>Current balance</span>
                  <span className="font-semibold">€0</span>
                </div>
                <div className="flex justify-between text-warning-800">
                  <span>Shortfall</span>
                  <span className="font-semibold">€100</span>
                </div>
              </div>
              <p className="text-gray-500 text-xs">
                Please add funds to your account to proceed with this
                investment. You can deposit funds using various payment methods
                including UPI, Net Banking, or Credit/Debit Card.
              </p>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-center items-center gap-3 w-full">
                <Button
                  className="w-full"
                  variant="bordered"
                  onPress={onCloseAddFunds}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-gradient-to-r from-[#E7649C] to-[#fc3c61] text-white w-full"
                  onPress={onOpenChangeAddFundsModal}
                >
                  Add Funds Now
                </Button>
              </div>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpenAddFundsModal}
        onOpenChange={onOpenChangeAddFundsModal}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h1 className="w-full text-xl mt-2 text-default-800 block max-w-full">
                Add Funds to Your Account
              </h1>
              <p className="font-normal text-sm text-gray-600 mb-4">
                Add money to your account to proceed with your investment.
              </p>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold"
                  htmlFor="add-funds-amount"
                >
                  Amount
                </label>
                <NumberInput
                  hideStepper
                  className="w-full"
                  id="add-funds-amount"
                  minValue={100}
                  value={addFundsAmount}
                  variant="bordered"
                  onChange={(val) => setAddFundsAmount(Number(val))}
                />
                <span className="text-xs text-gray-500">
                  Minimum deposit: 100
                </span>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-end gap-2 w-full">
                <Button
                  variant="bordered"
                  onPress={() => onCloseAddFundsModal()}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    AddFunds();
                  }}
                >
                  Add Funds
                </Button>
              </div>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Investement;
