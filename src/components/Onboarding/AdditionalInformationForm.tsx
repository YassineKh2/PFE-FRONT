import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import { subtitle } from "../primitives";
import Checkbox from "./Checkbox";
import { AdditionalInformationFormSchemaType } from "@/types/Onbording";
import { AdditionalInformationFormSchema } from "@/schemas/onbordingSchema";


function AdditionalInformationForm({
  setStep,
  setIsAdditionalInformationFormValid,
  setAdditionalInformationFormData,
  AdditionalInformationFormData,
}: {
  setStep: (step: number) => void;
  setIsAdditionalInformationFormValid: (isValid: boolean) => void;
  setAdditionalInformationFormData: (
    data: AdditionalInformationFormSchemaType
  ) => void;
  AdditionalInformationFormData?: AdditionalInformationFormSchemaType;
}) {
  const { handleSubmit, register, formState, setValue, setError, clearErrors } =
    useForm<AdditionalInformationFormSchemaType>({
      resolver: zodResolver(AdditionalInformationFormSchema),
      mode: "onChange",
      defaultValues: AdditionalInformationFormData,
    });
  const [sectorsRestrictions, setsectorsRestrictions] = useState<Set<string>>(
    new Set()
  );
  const [isSMSSelected, setIsSMSSelected] = useState(true);
  const [isEmailSelected, setIsEmailSelected] = useState(true);
  const [isPushSelected, setIsPushSelected] = useState(true);

  useEffect(() => {
    setValue("sectorsRestrictions", Array.from(sectorsRestrictions));
    if (sectorsRestrictions.size) {
      clearErrors("sectorsRestrictions");
    } else {
      if (formState.isSubmitted) {
        setError("sectorsRestrictions", {
          type: "required",
          message: "Sectors Restrictions is required",
        });
      }
    }
  }, [sectorsRestrictions]);

  useEffect(() => {
    const notificationPreferences: string[] = [];
    if (isEmailSelected) notificationPreferences.push("email");
    if (isSMSSelected) notificationPreferences.push("sms");
    if (isPushSelected) notificationPreferences.push("push");
    setValue("notificationPreference", notificationPreferences);
  }, [isEmailSelected, isSMSSelected, isPushSelected]);

  const onSubmit = (data: AdditionalInformationFormSchemaType) => {
    setAdditionalInformationFormData(data);
    setIsAdditionalInformationFormValid(true);
    setStep(5);
  };

  return (
    <form
      className="max-w-2xl w-full bg-white rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className={subtitle()}>Financial Situation</p>
      <div className="flex flex-col gap-4 mt-5">
        <div className="flex flex-col md:flex-row gap-4">
          <Select
            label="Update Frequency"
            {...register("updateFrequency")}
            errorMessage={formState.errors.updateFrequency?.message}
            isInvalid={!!formState.errors.updateFrequency}
            variant="bordered"
          >
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="bi-weekly">BI-Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="bi-monthly">BI-Monthly</SelectItem>
            <SelectItem value="quarter">Quarter</SelectItem>
            <SelectItem value="semester">Semester</SelectItem>
          </Select>
          <Select
            {...register("sectorsRestrictions")}
            errorMessage={formState.errors.sectorsRestrictions?.message}
            isInvalid={!!formState.errors.sectorsRestrictions}
            label="Sectors Restrictions"
            selectedKeys={sectorsRestrictions}
            selectionMode="multiple"
            variant="bordered"
            onSelectionChange={(selected) =>
              setsectorsRestrictions(new Set(selected as unknown as string[]))
            }
          >
            <SelectItem value="no">No Restrictions</SelectItem>
            <SelectItem key="equity">Equity</SelectItem>
            <SelectItem key="hybrid">Hybrid</SelectItem>
            <SelectItem key="debt">Debt</SelectItem>
            <SelectItem key="thematic">Thematic</SelectItem>
            <SelectItem key="index">Index</SelectItem>
            <SelectItem key="international">International</SelectItem>
          </Select>
        </div>
        <p className="text-gray-600">Notification Preferance</p>
        <div>
          <div className="flex gap-1 items-center">
            <Checkbox
              defaultSelected={isSMSSelected}
              onValueChange={(isSelected: boolean) =>
                setIsSMSSelected(isSelected)
              }
            >
              SMS
            </Checkbox>
            <Checkbox
              defaultSelected={isEmailSelected}
              onValueChange={(isSelected: boolean) =>
                setIsEmailSelected(isSelected)
              }
            >
              Email
            </Checkbox>
            <Checkbox
              defaultSelected={isPushSelected}
              onValueChange={(isSelected: boolean) =>
                setIsPushSelected(isSelected)
              }
            >
              Push
            </Checkbox>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-6 gap-2">
        <Button type="button" variant="bordered" onPress={() => setStep(3)}>
          Back
        </Button>
        <Button color="primary" type="submit">
          Finalize
        </Button>
      </div>
    </form>
  );
}

export default AdditionalInformationForm;
