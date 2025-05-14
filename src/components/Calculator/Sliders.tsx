import { NumberInput } from "@heroui/number-input";
import { Slider } from "@heroui/slider";
import { subtitle } from "../primitives";

const Siders = ({
    investmentType,
    monthlyInvestment,
    oneTimeInvestment,
    returnRate,
    timePeriod,
    calculatedValues,
    setMonthlyInvestment,
    setOneTimeInvestment,
    setReturnRate,
    setTimePeriod,
  }: {
    investmentType: number;
    monthlyInvestment: number;
    oneTimeInvestment: number;
    returnRate: number;
    timePeriod: number;
    calculatedValues: {
      investedAmount: number;
      estimatedReturns: number;
      totalValue: number;
    };
    setMonthlyInvestment: (value: number) => void;
    setOneTimeInvestment: (value: number) => void;
    setReturnRate: (value: number) => void;
    setTimePeriod: (value: number) => void;
  }) => {
    const currentInvestment =
      investmentType === 0 ? monthlyInvestment : oneTimeInvestment;
    const setCurrentInvestment =
      investmentType === 0 ? setMonthlyInvestment : setOneTimeInvestment;
  
    return (
      <div className="flex flex-col gap-12 w-[65%]">
        <div className="flex flex-col gap-4 justify-center">
          <div className="flex justify-between">
            <p className={subtitle()}>Invested Amount</p>
            <NumberInput
              hideStepper
              size="sm"
              className="w-[35%]"
              variant="flat"
              color="primary"
              value={currentInvestment}
              onChange={(value) => setCurrentInvestment(Number(value))}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-primary-600 text-small">$</span>
                </div>
              }
            />
          </div>
          <Slider
            className="max-w-lg"
            value={currentInvestment}
            onChange={(value) =>
              setCurrentInvestment(Array.isArray(value) ? value[0] : value)
            }
            size="sm"
            maxValue={investmentType === 0 ? 10000 : 100000}
            minValue={investmentType === 0 ? 500 : 5000}
            step={investmentType === 0 ? 50 : 500}
            showTooltip={true}
            tooltipValueFormatOptions={{ style: "currency", currency: "USD" }}
          />
        </div>
  
        <div className="flex flex-col gap-4 justify-center">
          <div className="flex justify-between">
            <p className={subtitle()}>Expected Return Rate (%)</p>
            <NumberInput
              hideStepper
              size="sm"
              className="w-[35%]"
              variant="flat"
              color="primary"
                maxValue={30}
                minValue={1}
              value={returnRate}
              onChange={(value) => setReturnRate(Number(value))}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-primary-600 text-small">%</span>
                </div>
              }
            />
          </div>
          <Slider
            className="max-w-lg"
            value={returnRate}
            onChange={(value) =>
              setReturnRate(Array.isArray(value) ? value[0] : value)
            }
            size="sm"
            maxValue={30}
            minValue={1}
            step={0.5}
            showTooltip={true}
          />
        </div>
  
        <div className="flex flex-col gap-4 justify-center">
          <div className="flex justify-between">
            <p className={subtitle()}>Time Period (Years)</p>
            <NumberInput
              hideStepper
              size="sm"
              className="w-[35%]"
              variant="flat"
              color="primary"
              maxValue={30}
              minValue={1}
              value={timePeriod}
              onChange={(value) => setTimePeriod(Number(value))}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-primary-600 text-small">Yr</span>
                </div>
              }
            />
          </div>
          <Slider
            className="max-w-lg"
            value={timePeriod}
            onChange={(value) =>
              setTimePeriod(Array.isArray(value) ? value[0] : value)
            }
            size="sm"
            maxValue={30}
            minValue={1}
            step={1}
            showTooltip={true}
          />
        </div>
  
        <div className="space-y-4 pb-5">
          <div className="flex justify-between">
            <p className="text-gray-600">Invested Amount</p>
            <p className="text-gray-800 font-semibold">
              ${calculatedValues.investedAmount.toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Est. Returns</p>
            <p className="text-gray-800 font-semibold">
              ${calculatedValues.estimatedReturns.toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Total Value</p>
            <p className="text-gray-800 font-semibold">
              ${calculatedValues.totalValue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
export default Siders;  