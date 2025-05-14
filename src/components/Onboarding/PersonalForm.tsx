import { PersonalFormSchema } from "@/schemas/onbordingSchema";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@heroui/date-picker";
import { useForm } from "react-hook-form";
import { subtitle } from "../primitives";
import { NumberInput } from "@heroui/number-input";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";
import { PersonalFormSchemaType } from "@/types/Onbording";



function PersonalForm({
  setStep,
  setIsPersonalFormValid,
  setPersonalFormData,
  PersonalFromData,
}: {
  setStep: (step: number) => void;
  setIsPersonalFormValid: (isValid: boolean) => void;
  setPersonalFormData: (data: PersonalFormSchemaType) => void;
  PersonalFromData?: PersonalFormSchemaType;
}) {


  const [birthDate, setbirthDate] = useState(
    parseDate(PersonalFromData?.dateOfBirth || new Date().toISOString().split("T")[0])
  );

  const { handleSubmit, register, formState, setValue } =
    useForm<PersonalFormSchemaType>({
      resolver: zodResolver(PersonalFormSchema),
      mode: "onChange",
      defaultValues: PersonalFromData,
    });


  const validateDate = () => {
    const todayDate = parseDate(new Date().toISOString().split("T")[0]);
    const age =
      todayDate.year -
      birthDate.year -
      (todayDate.month < birthDate.month ||
      (todayDate.month === birthDate.month && todayDate.day < birthDate.day)
        ? 1
        : 0);
    return age <= 18;
  };

  useEffect(() => {
    setValue("dateOfBirth", birthDate.toString());
  }, [birthDate]);

  useEffect(() => {
    if (!formState.isValid) setIsPersonalFormValid(false);
    else setIsPersonalFormValid(true);
  }, [formState.isValid]);

  const onSubmit = (data: PersonalFormSchemaType) => {
    setIsPersonalFormValid(true);
    setPersonalFormData(data);
    setStep(1);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl w-full bg-white rounded-lg border dark:border-none border-[#18181B/0.2] shadow-xl dark:bg-[#18181B] p-4 md:p-6"
    >
      <p className={subtitle()}>Personal & Contact</p>
      <div className="flex flex-col gap-4 mt-5">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            variant="bordered"
            label="Full Name"
            {...register("fullName")}
            errorMessage={formState.errors.fullName?.message}
            isInvalid={!!formState.errors.fullName}
          />
          {/* @ts-ignore */}
          <NumberInput
            variant="bordered"
            label="Phone Number"
            hideStepper
            {...register("phoneNumber")}
            errorMessage={formState.errors.phoneNumber?.message}
            isInvalid={!!formState.errors.phoneNumber}
          />
        </div>
        {/* the ts ignores are because of Hero UI ts support */}
        <DatePicker
          variant="bordered"
          showMonthAndYearPickers
          label="Birth date"
          name="dateOfBirth"
          // @ts-ignore
          maxValue={today(getLocalTimeZone())}
          // @ts-ignore
          value={birthDate}
          // @ts-ignore
          onChange={setbirthDate}
          errorMessage={"You must be 18 years or older"}
          isInvalid={formState.isSubmitted && validateDate()}
        />
      </div>
      <div className="flex justify-end mt-6">
        <Button type="submit" color="primary">
          Next
        </Button>
      </div>
    </form>
  );
}

export default PersonalForm;
