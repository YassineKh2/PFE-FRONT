import { Chip } from "@heroui/chip";
import { Icon } from "@iconify/react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberInput,
  useDisclosure,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Fund } from "@/types/MutualFunds";
import { useAuth } from "@/providers/AuthProvider";
import { SystemPoints } from "@/types/User";
import { UpdateSystemPreferences } from "@/services/User";
import { GetSingleAssetInfo, SellAsset } from "@/services/Deposit";
import { UserAssetDetails } from "@/types/Deposit";

function renderStars(rating: number) {
  return [1, 2, 3, 4, 5].map((i) => {
    if (rating >= i) {
      return (
        <Icon
          key={i}
          height="20"
          icon="material-symbols:star-rounded"
          width="20"
        />
      );
    } else if (rating >= i - 0.5) {
      return (
        <Icon
          key={i}
          height="20"
          icon="material-symbols:star-half-rounded"
          width="20"
        />
      );
    } else {
      return (
        <Icon
          key={i}
          height="20"
          icon="material-symbols:star-outline-rounded"
          width="20"
        />
      );
    }
  });
}
export default function FundInfo({
  mutualFund,
  AsManager,
  ClientId,
}: {
  mutualFund: Fund;
  AsManager?: boolean;
  ClientId?: string;
}) {
  const [IsSaved, setIsSaved] = useState<Boolean>(false);
  const [SellFunds, setSellFunds] = useState(0);
  const [AssetInfo, setAssetInfo] = useState({} as UserAssetDetails);
  const [idUser, setidUser] = useState("");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const userUID = currentUser.uid;

    if (!userUID) return;

    const savedFunds = localStorage.getItem(`savedFunds_${userUID}`);

    if (!savedFunds) return;

    let savedFundsTable = JSON.parse(savedFunds) as String[];

    setIsSaved(savedFundsTable.includes(mutualFund.isin));
  }, []);

  useEffect(() => {
    let userUID: string;

    // if the user is a manager, we get the clientId from the props
    if (AsManager) userUID = ClientId || "";
    else userUID = currentUser.uid;

    setidUser(userUID);

    if (!userUID) return;
    GetSingleAssetInfo(userUID, { isin: mutualFund.isin }).then((data) => {
      setAssetInfo(data);
    });
  }, []);

  const SaveFund = () => {
    const userUID = currentUser.uid;

    if (!userUID) return;

    const savedFunds = localStorage.getItem(`savedFunds_${userUID}`);
    let savedFundsTable = savedFunds ? JSON.parse(savedFunds) : [];

    if (savedFundsTable.includes(mutualFund.isin)) return;
    savedFundsTable.push(mutualFund.isin);
    localStorage.setItem(
      `savedFunds_${userUID}`,
      JSON.stringify(savedFundsTable),
    );
    setIsSaved(true);

    const PointsToAdd: SystemPoints = {
      method: "add",
      amount: 2,
      asset: mutualFund.category.toLowerCase(),
      sector: mutualFund.sector.toLowerCase(),
    };

    if (!AsManager) UpdateSystemPreferences(currentUser.uid, PointsToAdd);
  };

  const RemoveFund = () => {
    const userUID = currentUser.uid;

    if (!userUID) return;

    const savedFunds = localStorage.getItem(`savedFunds_${userUID}`);

    if (!savedFunds) return;

    let savedFundsTable = JSON.parse(savedFunds) as String[];

    savedFundsTable = savedFundsTable.filter(
      (code) => code !== mutualFund.isin,
    );

    localStorage.setItem(
      `savedFunds_${userUID}`,
      JSON.stringify(savedFundsTable),
    );
    setIsSaved(false);

    const PointsToAdd: SystemPoints = {
      method: "remove",
      amount: 2,
      asset: mutualFund.category.toLowerCase(),
      sector: mutualFund.sector.toLowerCase(),
    };

    if (!AsManager) UpdateSystemPreferences(currentUser.uid, PointsToAdd);
  };

  const addToCompare = () => {
    localStorage.setItem(`CompareFunds`, mutualFund.isin);
    navigate("/compare");
  };

  function SellFundsFunc() {
    SellAsset(idUser, {
      isin: mutualFund.isin,
      shares: SellFunds,
    }).then(() => {
      if (AsManager) navigate("/dashboard/clients");
      else navigate("/dashboard/home");
    });
  }

  return (
    <>
      <div className="flex flex-col gap-8 max-w-7xl w-full bg-white rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-6">
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className={"text-2xl font-bold"}>{mutualFund.name}</p>
              <Chip size="sm">{mutualFund.risk}</Chip>
            </div>
            <div className="flex items-center gap-2">
              <p>{mutualFund.category}</p>
              <div className="flex text-warning-500 gap-2 items-center">
                <div className="flex">{renderStars(mutualFund.rating)}</div>
                <p className="text-sm text-gray-500">{mutualFund.rating}/5</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {AssetInfo.amount_invested > 0 && (
              <Button
                color="primary"
                startContent={
                  <Icon
                    height="20"
                    icon="material-symbols:sell-outline"
                    width="20"
                  />
                }
                variant="solid"
                onPress={onOpen}
              >
                Sell Shares
              </Button>
            )}
            <Button
              startContent={<Icon height="20" icon="ix:compare" width="20" />}
              variant="bordered"
              onPress={addToCompare}
            >
              Add To Compare
            </Button>
            <Button
              startContent={
                <Icon className="mr-2 h-4 w-4" icon="mdi:share-variant" />
              }
              variant="bordered"
            >
              Share
            </Button>
            <Button
              isIconOnly
              className="bg-white dark:bg-[#18181B] hover:bg-orange-300 dark:hover:bg-orange-500"
            >
              {IsSaved ? (
                <Icon
                  color="#fdba74"
                  height="24"
                  icon="material-symbols:star-rounded"
                  width="24"
                  onClick={() => {
                    RemoveFund();
                  }}
                />
              ) : (
                <Icon
                  height="24"
                  icon="material-symbols:star-outline-rounded"
                  width="24"
                  onClick={() => {
                    SaveFund();
                  }}
                />
              )}
            </Button>
          </div>
        </div>
        <div className="flex justify-between w-full pe-36">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500">NAV Price</p>
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">€{mutualFund.latestnav}</p>
              <p className="text-xs text-green-600">+2.2%</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500">AUM</p>
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">
                €{(mutualFund.AUM / 1000000).toFixed(0)}M
              </p>
              <p className="text-xs text-red-500">-0.2%</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500">Expense Ratio</p>
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{mutualFund.expense_ratio}%</p>
              <p className="text-xs text-grays-600">0%</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500">Min. Investment</p>
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{mutualFund.minInvestment}</p>
            </div>
            <p className="text-sm text-gray-500">Monthly SIP</p>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h1 className="w-full text-xl mt-2 text-default-800 block max-w-full">
                Wtihdraw Funds to Your Bank Account
              </h1>
              <p className="font-normal text-sm text-gray-600 mb-4">
                Add money to your bank account to proceed with your investment.
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
                  maxValue={AssetInfo.amount_invested || 100}
                  minValue={100}
                  value={SellFunds}
                  variant="bordered"
                  onChange={(val) => setSellFunds(Number(val))}
                />
                <span className="text-xs text-gray-500">
                  You have a total of {Math.floor(AssetInfo.amount_invested)}€{" "}
                  invested
                </span>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-end gap-2 w-full">
                <Button variant="bordered" onPress={() => onClose()}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    SellFundsFunc();
                  }}
                >
                  Sell Shares
                </Button>
              </div>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
