import { Button } from "@heroui/button";
import { subtitle } from "../primitives";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PreferencesFormSchema } from "@/schemas/onbordingSchema";
import { Select, SelectItem } from "@heroui/select";
import { Radio, RadioGroup } from "@heroui/radio";
import { useEffect, useState } from "react";
import { cn } from "@heroui/theme";
import { Slider } from "@heroui/slider";
import { PreferencesFormSchemaType } from "@/types/Onbording";


function PreferencesFrom({
  setStep,
  setIsPreferencesFormValid,
  setPreferencesFormData,
  PreferencesFormData,
}: {
  setStep: (step: number) => void;
  setIsPreferencesFormValid: (isValid: boolean) => void;
  setPreferencesFormData: (data: PreferencesFormSchemaType) => void;
  PreferencesFormData?: PreferencesFormSchemaType;
}) {
  const { handleSubmit, register, formState, setValue, setError, clearErrors } =
    useForm({
      resolver: zodResolver(PreferencesFormSchema),
      mode: "onChange",
      defaultValues: PreferencesFormData,
    });
  const [liquidityNeeds, setLiquidityNeeds] = useState<String>(
    PreferencesFormData?.liquidityNeeds === "0" ? "No" : "Yes"
  );
  const [assetAllocation, setAssetAllocation] = useState<Set<string>>(
    new Set(PreferencesFormData?.assetAllocation) || new Set()
  );
  const [sectorPreferences, setSectorPreferences] = useState<Set<string>>(
    new Set(PreferencesFormData?.sectorPreference) || new Set()
  );

  useEffect(() => {
    setValue("assetAllocation", Array.from(assetAllocation));
    if (assetAllocation.size) {
      clearErrors("assetAllocation");
    } else {
      if (formState.isSubmitted) {
        setError("assetAllocation", {
          type: "required",
          message: "Asset Allocation is required",
        });
      }
    }
  }, [assetAllocation]);

  useEffect(() => {
    setValue("sectorPreference", Array.from(sectorPreferences));
    if (sectorPreferences.size) {
      clearErrors("sectorPreference");
    } else {
      if (formState.isSubmitted) {
        setError("sectorPreference", {
          type: "required",
          message: "Sector Preference is required",
        });
      }
    }
  }, [sectorPreferences]);

  useEffect(() => {
    if (liquidityNeeds === "No") {
      setValue("liquidityNeeds", "0");
    }
  }, [liquidityNeeds]);

  const onSubmit = (data: PreferencesFormSchemaType) => {
    setPreferencesFormData(data);
    setIsPreferencesFormValid(true);
    setStep(4);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl w-full bg-white rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-6"
    >
      <p className={subtitle()}>Preferences</p>
      <div className="flex flex-col gap-4 mt-5">
        <div className="flex flex-col md:flex-row gap-4">
          <Select
            variant="bordered"
            selectionMode="multiple"
            label="Asset Allocation"
            description="What are you investing for?"
            {...register("assetAllocation")}
            errorMessage={formState.errors.assetAllocation?.message}
            isInvalid={!!formState.errors.assetAllocation}
            onSelectionChange={(keys) =>
              setAssetAllocation(new Set(keys as unknown as string[]))
            }
            selectedKeys={assetAllocation}
          >
            <SelectItem key="equity">Equity</SelectItem>
            <SelectItem key="hybrid">Hybrid</SelectItem>
            <SelectItem key="debt">Debt</SelectItem>
            <SelectItem key="thematic">Thematic</SelectItem>
            <SelectItem key="index">Index</SelectItem>
            <SelectItem key="international">International</SelectItem>
          </Select>
          <Select
            selectionMode="multiple"
            variant="bordered"
            label="Sector Preference"
            {...register("sectorPreference")}
            errorMessage={formState.errors.sectorPreference?.message}
            isInvalid={!!formState.errors.sectorPreference}
            onSelectionChange={(keys) =>
              setSectorPreferences(new Set(keys as unknown as string[]))
            }
            selectedKeys={sectorPreferences}
          >
            <SelectItem key="technology">Technology</SelectItem>
            <SelectItem key="healthcare">Healthcare</SelectItem>
            <SelectItem key="finance">Finance</SelectItem>
            <SelectItem key="energy">Energy</SelectItem>
            <SelectItem key="consumer-goods">Consumer Goods</SelectItem>
            <SelectItem key="utilities">Utilities</SelectItem>
            <SelectItem key="real-estate">Real Estate</SelectItem>
            <SelectItem key="industrial">Industrial</SelectItem>
            <SelectItem key="telecommunications">Telecommunications</SelectItem>
            <SelectItem key="materials">Materials</SelectItem>
          </Select>
        </div>
        <Select
          variant="bordered"
          label="Tax Consideration"
          {...register("taxConsideration")}
          errorMessage={formState.errors.taxConsideration?.message}
          isInvalid={!!formState.errors.taxConsideration}
        >
          <SelectItem key="none" textValue="No Specific Tax Strategy">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-gray-800">
                No Specific Tax Strategy
              </p>
              <p className="text-xs text-gray-600">
                I don't have any particular tax-related preferences
              </p>
            </div>
          </SelectItem>
          <SelectItem key="taxEfficient" textValue="Tax-Efficient Investments">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-gray-800">
                Tax-Efficient Investments
              </p>
              <p className="text-xs text-gray-600">
                I prefer funds that are managed to minimize taxable
                distributions
              </p>
            </div>
          </SelectItem>
          <SelectItem
            key="taxAdvantaged"
            textValue="Investing via Tax-Advantaged Account"
          >
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-gray-800">
                Investing via Tax-Advantaged Account
              </p>
              <p className="text-xs text-gray-600">
                I am primarily investing through accounts like IRAs, 401(k)s, or
                Roth IRAs
              </p>
            </div>
          </SelectItem>
          <SelectItem
            key="taxHighBracket"
            textValue="High Tax Bracket – Minimize Distributions"
          >
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-gray-800">
                High Tax Bracket – Minimize Distributions
              </p>
              <p className="text-xs text-gray-600">
                I'm in a higher tax bracket and want to avoid funds with
                frequent capital gains distributions
              </p>
            </div>
          </SelectItem>
          <SelectItem
            key="taxHarvesting"
            textValue="Interested in Tax-Loss Harvesting"
          >
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-gray-800">
                Interested in Tax-Loss Harvesting
              </p>
              <p className="text-xs text-gray-600">
                I plan to actively manage my investments with strategies like
                tax-loss harvesting
              </p>
            </div>
          </SelectItem>
        </Select>
        <RadioGroup
          // @ts-ignore
          value={liquidityNeeds}
          onValueChange={setLiquidityNeeds}
          isInvalid={formState.isSubmitted && liquidityNeeds === undefined}
          label="Liquidity Needs"
          className="w-full left-2"
          name="liquidityNeeds"
          orientation="horizontal"
        >
          <Radio
            description="I am planning to retive my a part investment often."
            value="Yes"
            className={cn(
              "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
              "max-w-[300px] me-5 mt-2 cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
              "data-[selected=true]:border-primary"
            )}
          >
            Yes
          </Radio>
          <Radio
            description="I am not planning to retive my a part investment often."
            value="No"
            className={cn(
              "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
              "max-w-[300px] cursor-pointer mt-2 border-2 border-default rounded-lg gap-4 p-4",
              "data-[selected=true]:border-primary"
            )}
          >
            No
          </Radio>
        </RadioGroup>
        {liquidityNeeds === "Yes" && (
          // @ts-ignore
          <Slider
            defaultValue={Number(PreferencesFormData?.liquidityNeeds) || 8}
            minValue={3}
            maxValue={30}
            className="mt-4"
            {...register("liquidityNeeds")}
            formatOptions={{ style: "unit", unit: "month" }}
            label="Once Every"
            marks={[
              {
                value: 8,
                label: "8 Months",
              },
              {
                value: 16,
                label: "16 Months",
              },
              {
                value: 26,
                label: "26 Months",
              },
            ]}
            showTooltip={true}
            tooltipValueFormatOptions={{ style: "unit", unit: "month" }}
          />
        )}
      </div>

      <div className="flex justify-between mt-6 gap-2">
        <Button type="button" variant="bordered" onPress={() => setStep(2)}>
          Back
        </Button>
        <Button type="submit" color="primary" className="">
          Next
        </Button>
      </div>
    </form>
  );
}

export default PreferencesFrom;
