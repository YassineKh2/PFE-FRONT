import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberInput,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();
  const [WithdrawFunds, setWithdrawFunds] = useState(0);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  function Withdraw() {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Card className="w-full p-5 flex flex-col lg:flex-row justify-between items-center overflow-auto">
        <p className="font-semibold text-lg">Quick Actions</p>
        <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-row lg:justify-between">
          <Button
            color="primary"
            size="sm"
            startContent={<Icon icon="mdi:trending-up" width={20} />}
            onPress={() => navigate("/home")}
          >
            Invest Now
          </Button>
          <Button
            size="sm"
            startContent={<Icon icon="mdi:cash-minus" width={20} />}
            variant="bordered"
            onPress={onOpen}
          >
            Withdraw
          </Button>
          <Button
            size="sm"
            startContent={<Icon icon="mdi:swap-horizontal" width={20} />}
            variant="bordered"
          >
            Switch Funds
          </Button>
          <Button
            size="sm"
            startContent={
              <Icon icon="mdi:chart-bell-curve-cumulative" width={20} />
            }
            variant="bordered"
          >
            Rebalance
          </Button>
          <Button
            size="sm"
            startContent={
              <Icon
                icon="carbon:ibm-consulting-advantage-assistant"
                width={20}
              />
            }
            variant="bordered"
            onPress={() => navigate("/dashboard/managerchat")}
          >
            Chat With Manager
          </Button>
          <Button
            size="sm"
            startContent={<Icon icon="mdi:file-download-outline" width={20} />}
            variant="bordered"
          >
            Download Report
          </Button>
        </div>
      </Card>

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
                  minValue={100}
                  value={WithdrawFunds}
                  variant="bordered"
                  onChange={(val) => setWithdrawFunds(Number(val))}
                />
                <span className="text-xs text-gray-500">
                  Minimum amount: 100
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
                    Withdraw();
                  }}
                >
                  Withdraw Funds
                </Button>
              </div>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

export default QuickActions;
