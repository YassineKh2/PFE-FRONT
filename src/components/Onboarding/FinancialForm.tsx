import { Button } from "@heroui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumberInput } from "@heroui/number-input";
import { Select, SelectItem } from "@heroui/select";
import { Slider } from "@heroui/slider";

import { subtitle } from "../primitives";

import { FinancialFormSchema } from "@/schemas/onbordingSchema";
import { FinancialFormSchemaType } from "@/types/Onbording";

function FinancialForm({
  setStep,
  setIsFinancialFormValid,
  setFinancialFormData,
  FinancialFormData,
}: {
  setStep: (step: number) => void;
  setIsFinancialFormValid: (isValid: boolean) => void;
  setFinancialFormData: (data: FinancialFormSchemaType) => void;
  FinancialFormData?: FinancialFormSchemaType;
}) {
  const { handleSubmit, register, formState } =
    useForm<FinancialFormSchemaType>({
      resolver: zodResolver(FinancialFormSchema),
      mode: "onChange",
      defaultValues: FinancialFormData,
    });

  const onSubmit = (data: FinancialFormSchemaType) => {
    setFinancialFormData(data);
    setIsFinancialFormValid(true);
    setStep(2);
  };

  return (
    <form
      className="max-w-2xl w-full bg-white rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className={subtitle()}>Financial Situation</p>
      <div className="flex flex-col gap-4 mt-5">
        <div className="flex gap-4">
          {/* @ts-ignore */}
          <NumberInput
            hideStepper
            label="Monthly Income"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">€ </span>
              </div>
            }
            variant="bordered"
            {...register("monthyIncome")}
            errorMessage={formState.errors.monthyIncome?.message}
            isInvalid={!!formState.errors.monthyIncome}
          />
          {/* @ts-ignore */}
          <NumberInput
            hideStepper
            label="Monthly Expense"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">€ </span>
              </div>
            }
            variant="bordered"
            {...register("monthlyExpense")}
            errorMessage={formState.errors.monthlyExpense?.message}
            isInvalid={!!formState.errors.monthlyExpense}
          />
        </div>
        <div className="flex gap-4">
          {/* @ts-ignore */}
          <NumberInput
            hideStepper
            label="Assets"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">€ </span>
              </div>
            }
            variant="bordered"
            {...register("assets")}
            errorMessage={formState.errors.assets?.message}
            isInvalid={!!formState.errors.assets}
          />
          {/* @ts-ignore */}
          <NumberInput
            hideStepper
            label="Liabilities"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">€ </span>
              </div>
            }
            variant="bordered"
            {...register("liabilities")}
            errorMessage={formState.errors.liabilities?.message}
            isInvalid={!!formState.errors.liabilities}
          />
        </div>
        <div className="flex gap-4">
          {/* @ts-ignore */}
          <NumberInput
            hideStepper
            label="Estimatd Net Worth"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">€ </span>
              </div>
            }
            variant="bordered"
            {...register("estimatedNetWorth")}
            errorMessage={formState.errors.estimatedNetWorth?.message}
            isInvalid={!!formState.errors.estimatedNetWorth}
          />
          <Select
            label="Investment Goal"
            variant="bordered"
            {...register("primaryGoal")}
            errorMessage={formState.errors.primaryGoal?.message}
            isInvalid={!!formState.errors.primaryGoal}
          >
            <SelectItem key="growth">Growth</SelectItem>
            <SelectItem key="retirement-planning">
              Retirement Planning
            </SelectItem>
            <SelectItem key="college-savings">College Savings</SelectItem>
            <SelectItem key="wealth-creation">Wealth Creation</SelectItem>
            <SelectItem key="long-term-investment">
              Long-term Investment
            </SelectItem>
            <SelectItem key="tax-saving">Tax Saving</SelectItem>
            <SelectItem key="aggressive-growth">Aggressive Growth</SelectItem>
            <SelectItem key="wealth-preservation">
              Wealth Preservation
            </SelectItem>
            <SelectItem key="passive-investment">Passive Investment</SelectItem>
            <SelectItem key="emergency-fund">Emergency Fund</SelectItem>
            <SelectItem key="short-term-savings">Short-term Savings</SelectItem>
            <SelectItem key="thematic-investment">
              Thematic Investment
            </SelectItem>
            <SelectItem key="global-exposure">Global Exposure</SelectItem>
            <SelectItem key="capital-preservation">
              Capital Preservation
            </SelectItem>
            <SelectItem key="ethical-investment">Ethical Investment</SelectItem>
          </Select>
        </div>
        {/* @ts-ignore */}
        <Slider
          defaultValue={Number(FinancialFormData?.goalTimeFrame) || 5}
          maxValue={30}
          minValue={1}
          {...register("goalTimeFrame")}
          formatOptions={{ style: "unit", unit: "year" }}
          label="Goal Time Frame"
          marks={[
            {
              value: 5,
              label: "5 Years",
            },
            {
              value: 15,
              label: "15 Years",
            },
            {
              value: 25,
              label: "25 Years",
            },
          ]}
          showTooltip={true}
          tooltipValueFormatOptions={{ style: "unit", unit: "year" }}
        />
      </div>
      <div className="flex justify-between mt-6 gap-2">
        <Button type="button" variant="bordered" onPress={() => setStep(0)}>
          Back
        </Button>
        <Button className="" color="primary" type="submit">
          Next
        </Button>
      </div>
    </form>
  );
}

export default FinancialForm;
