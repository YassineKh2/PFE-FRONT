import { Button } from "@heroui/button";
import { subtitle } from "../primitives";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectItem } from "@heroui/select";
import { RadioGroup, Radio } from "@heroui/radio";
import { cn } from "@heroui/theme";
import { useEffect, useState } from "react";
import { ExperienceFormSchemaType } from "@/types/Onbording";
import { ExperienceFormSchema } from "@/schemas/onbordingSchema";


function ExperienceForm({
  setStep,
  setIsExperienceFormValid,
  setExperienceFormData,
  experienceFormData,
}: {
  setStep: (step: number) => void;
  setIsExperienceFormValid: (isValid: boolean) => void;
  setExperienceFormData: (data: ExperienceFormSchemaType) => void;
  experienceFormData?: ExperienceFormSchemaType;
}) {
  const { handleSubmit, register, formState, setValue } =
    useForm<ExperienceFormSchemaType>({
      resolver: zodResolver(ExperienceFormSchema),
      mode: "onChange",
      defaultValues: experienceFormData,
    });

  const [previousInvestement, setpreviousInvestement] = useState<String>();
  useEffect(() => {
    setValue("previousInvestment", previousInvestement === "yes");
  }, [previousInvestement]);
  

  const onSubmit = (data: ExperienceFormSchemaType) => {
    console.log(data);
    setExperienceFormData(data);
    setIsExperienceFormValid(true);
    setStep(3);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl w-full bg-white rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-6"
    >
      <p className={subtitle()}>Financial Situation</p>
      <div className="flex flex-col gap-4 mt-5">
        <div className="flex gap-4">
          <Select
            variant="bordered"
            label="Market Fluctuation"
            {...register("marketFluctuation")}
            errorMessage={formState.errors.marketFluctuation?.message}
            isInvalid={!!formState.errors.marketFluctuation}
          >
            <SelectItem key="low">Low</SelectItem>
            <SelectItem key="moderate">Moderate</SelectItem>
            <SelectItem key="high">High</SelectItem>
            <SelectItem key="very-high">Very High</SelectItem>
          </Select>
          <Select
            variant="bordered"
            label="Risk Preference"
            {...register("riskPreference")}
            errorMessage={formState.errors.riskPreference?.message}
            isInvalid={!!formState.errors.riskPreference}
          >
            <SelectItem key="low">Low</SelectItem>
            <SelectItem key="moderate">Moderate</SelectItem>
            <SelectItem key="high">High</SelectItem>
            <SelectItem key="very-high">Very High</SelectItem>
          </Select>
        </div>
        <Select
          variant="bordered"
          label="Experience Level"
          {...register("experienceLevel")}
          errorMessage={formState.errors.experienceLevel?.message}
          isInvalid={!!formState.errors.experienceLevel}
        >
          <SelectItem key="beginner">Beginner (0-2) </SelectItem>
          <SelectItem key="intermediate">Intermediate (3-5)</SelectItem>
          <SelectItem key="advanced">Advanced (6-8)</SelectItem>
          <SelectItem key="expert">Expert (9+)</SelectItem>
        </Select>

        <RadioGroup
          // @ts-ignore
          value={previousInvestement}
          onValueChange={setpreviousInvestement}
          defaultValue={experienceFormData?.previousInvestment ? "yes" : "no"}
          isInvalid={!!formState.errors.previousInvestment}
          label="Previous Investments"
          className="w-full left-2"
          name="previousInvestment"
          orientation="horizontal"
        >
          <Radio
            description="I have never invested in Mutual Funds."
            value="no"
            className={cn(
              "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
              "max-w-[300px] me-5 mt-2 cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
              "data-[selected=true]:border-primary"
            )}
          >
            No
          </Radio>
          <Radio
            description="I have invested previously in Mutual Funds."
            value="yes"
            className={cn(
              "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
              "max-w-[300px] cursor-pointer mt-2 border-2 border-default rounded-lg gap-4 p-4",
              "data-[selected=true]:border-primary"
            )}
          >
            Yes
          </Radio>
        </RadioGroup>
      </div>
      <div className="flex justify-between mt-6 gap-2">
        <Button type="button" variant="bordered" onPress={() => setStep(1)}>
          Back
        </Button>
        <Button type="submit" color="primary" className="">
          Next
        </Button>
      </div>
    </form>
  );
}

export default ExperienceForm;
