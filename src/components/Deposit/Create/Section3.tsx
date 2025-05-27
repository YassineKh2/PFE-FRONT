import React from "react";
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

interface Section3Props {
  formData: any;
  errors: Record<string, string>;
  isProcessing: boolean;
  setCurrentSection: (section: number) => void;
  handleInputChange: (field: string, value: any) => void;
}

const Section3: React.FC<Section3Props> = ({
  formData,
  errors,
  isProcessing,
  setCurrentSection,
  handleInputChange,
}) => {
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
                <div className="font-bold">€{formData.amount}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-medium text-gray-500">Payment Method:</div>
                <div className="font-bold">
                  {formData.paymentMethod
                    ? formData.paymentMethod.toUpperCase()
                    : "N/A"}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="font-medium text-gray-500">
                  Recurring Interval:
                </div>
                <div className="font-bold">
                  {formData.recurringInterval
                    ? formData.recurringInterval
                    : "No"}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="font-medium text-gray-500">Full Name:</div>
                <div className="font-bold">{formData.fullName}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-medium text-gray-500">
                  Personal ID Number:
                </div>
                <div className="font-bold">{formData.personalIdNumber}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-medium text-gray-500">Mobile Number:</div>
                <div className="font-bold">{formData.mobileNumber}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-medium text-gray-500">Address:</div>
                <div className="font-bold">{formData.address || "N/A"}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-medium text-gray-500">Risk Tolerance:</div>
                <div className="font-bold">
                  {/* {formData.riskTolerance[0] === 1
                    ? "Very Conservative"
                    : formData.riskTolerance[0] === 2
                      ? "Conservative"
                      : formData.riskTolerance[0] === 3
                        ? "Moderate"
                        : formData.riskTolerance[0] === 4
                          ? "Aggressive"
                          : "Very Aggressive"} */}
                </div>
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
                  isSelected={formData.termsAccepted}
                  onValueChange={(checked) =>
                    handleInputChange("termsAccepted", checked)
                  }
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
              {errors.termsAccepted && (
                <p className="text-sm text-red-500">{errors.termsAccepted}</p>
              )}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="riskAcknowledged"
                  isSelected={formData.riskAcknowledged}
                  onValueChange={(checked) =>
                    handleInputChange("riskAcknowledged", checked)
                  }
                />
                <label
                  className="text-sm cursor-pointer"
                  htmlFor="riskAcknowledged"
                >
                  I acknowledge and understand the investment risks associated
                  with this deposit.
                </label>
              </div>
              {errors.riskAcknowledged && (
                <p className="text-sm text-red-500">
                  {errors.riskAcknowledged}
                </p>
              )}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="fatcaDeclaration"
                  isSelected={formData.fatcaDeclaration}
                  onValueChange={(checked) =>
                    handleInputChange("fatcaDeclaration", checked)
                  }
                />
                <label
                  className="text-sm cursor-pointer"
                  htmlFor="fatcaDeclaration"
                >
                  I confirm I am not a U.S. person and make FATCA declaration.
                </label>
              </div>
              {errors.fatcaDeclaration && (
                <p className="text-sm text-red-500">
                  {errors.fatcaDeclaration}
                </p>
              )}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="marketingConsent"
                  isSelected={formData.marketingConsent}
                  onValueChange={(checked) =>
                    handleInputChange("marketingConsent", checked)
                  }
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
        <Button color="primary" disabled={isProcessing} type="submit">
          {isProcessing ? "Processing..." : "Confirm & Deposit"}
        </Button>
      </div>
    </div>
  );
};

export default Section3;
