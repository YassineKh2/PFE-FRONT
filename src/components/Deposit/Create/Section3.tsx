import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Link,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { Deposit } from "@/types/Deposit";

interface Section3Props {
  Deposit: Deposit;
  SubmitData: () => void;
  setCurrentSection: (section: number) => void;
}

const Section3: React.FC<Section3Props> = ({
  Deposit,
  SubmitData,
  setCurrentSection,
}) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [riskAcknowledged, setRiskAcknowledged] = useState(false);
  const [fatcaDeclaration, setFatcaDeclaration] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [hasAccepted, sethasAccepted] = useState(false);
  const [hasSubmit, sethasSubmit] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (
      termsAccepted &&
      riskAcknowledged &&
      fatcaDeclaration &&
      marketingConsent
    )
      sethasAccepted(true);
    else sethasAccepted(false);
  }, [termsAccepted, riskAcknowledged, fatcaDeclaration, marketingConsent]);

  const Submit = () => {
    sethasSubmit(true);
    if (hasAccepted) {
      // setIsProcessing(true);
      SubmitData();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <CardHeader>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <div className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
            Review & Confirm
          </h2>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="space-y-4 bg-gray-50 p-4">
            <h3 className="font-medium text-lg">Summary of Your Deposit</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <div className="font-medium text-gray-500">Deposit Amount:</div>
                <div className="font-bold">€{Deposit.amount}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-medium text-gray-500">Payment Method:</div>
                <div className="font-bold">
                  {Deposit.paymentMethod
                    ? Deposit.paymentMethod.toUpperCase()
                    : "N/A"}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="font-medium text-gray-500">
                  Recurring Interval:
                </div>
                <div className="font-bold">
                  {Deposit.recurringInterval ? Deposit.recurringInterval : "No"}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="font-medium text-gray-500">Full Name:</div>
                <div className="font-bold">{Deposit.fullName}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-medium text-gray-500">
                  Personal ID Number:
                </div>
                <div className="font-bold">{Deposit.personalId}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-medium text-gray-500">Mobile Number:</div>
                <div className="font-bold">{Deposit.mobileNumber}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-medium text-gray-500">Address:</div>
                <div className="font-bold">{Deposit.address || "N/A"}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-medium text-gray-500">IBAN:</div>
                <div className="font-bold">{Deposit.ibanCode}</div>
              </div>
            </div>
          </div>

          <Divider />

          <div className="flex flex-col items-start gap-1 p-4 bg-yellow-50 text-yellow-800 rounded-md border border-yellow-300">
            <div className="flex items-center gap-2">
              <Icon
                className="text-warning-600"
                height="24"
                icon="mynaui:danger-hexagon"
                width="24"
              />
              <p className="text-md font-bold">Investment Risk Disclosure</p>
            </div>
            <p className="text-sm p-2 ms-5">
              Mutual fund investments are subject to market risks. Past
              performance is not indicative of future results. Please read all
              scheme related documents carefully before investing. The NAV of
              the scheme may go up or down depending upon the factors and forces
              affecting securities market.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Consent & Declarations *</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="termsAccepted"
                  isSelected={termsAccepted}
                  onValueChange={() => setTermsAccepted((prev) => !prev)}
                />
                <label
                  className="text-sm cursor-pointer"
                  htmlFor="termsAccepted"
                >
                  I agree to the{" "}
                  <Link className="text-rose-500 underline" href="#">
                    Terms and Conditions
                  </Link>{" "}
                  and Privacy Policy.
                </label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="riskAcknowledged"
                  isSelected={riskAcknowledged}
                  onValueChange={() => setRiskAcknowledged((prev) => !prev)}
                />
                <label
                  className="text-sm cursor-pointer"
                  htmlFor="riskAcknowledged"
                >
                  I acknowledge and understand the investment risks associated
                  with this deposit.
                </label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="fatcaDeclaration"
                  isSelected={fatcaDeclaration}
                  onValueChange={() => setFatcaDeclaration((prev) => !prev)}
                />
                <label
                  className="text-sm cursor-pointer"
                  htmlFor="fatcaDeclaration"
                >
                  I confirm I am not a U.S. person and make FATCA declaration.
                </label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="marketingConsent"
                  isSelected={marketingConsent}
                  onValueChange={() => setMarketingConsent((prev) => !prev)}
                />
                <label
                  className="text-sm cursor-pointer"
                  htmlFor="marketingConsent"
                >
                  I consent to receive marketing communications and offers.
                  (Optional)
                </label>
              </div>
            </div>
          </div>
          {!hasAccepted && hasSubmit && (
            <p className="text-xs text-primary-500">
              You have to accept the terms and conditions !
            </p>
          )}
        </CardBody>
      </Card>
      <div className="flex justify-between">
        <Button
          type="button"
          variant="bordered"
          onPress={() => setCurrentSection(2)}
        >
          <Icon
            className="-rotate-90"
            height="24"
            icon="basil:arrow-up-outline"
            width="24"
          />
          Previous: Personal Information
        </Button>
        <Button
          color="primary"
          // disabled={isProcessing}
          type="submit"
          onPress={Submit}
        >
          {isProcessing ? "Processing..." : "Confirm & Deposit"}
        </Button>
      </div>
    </div>
  );
};

export default Section3;
