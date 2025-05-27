import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { fromDate } from "@internationalized/date";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  NumberInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Switch,
  Calendar,
} from "@heroui/react";
import { cn } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Section1 as Section1Type } from "@/types/Deposit";
import { DepositDetailsSchema } from "@/schemas/Deposit";

interface Section1Props {
  Section1Data: Section1Type;
  setSection1Data: React.Dispatch<React.SetStateAction<Section1Type>>;
  setCurrentSection: (section: number) => void;
}

const Section1: React.FC<Section1Props> = ({
  Section1Data,
  setSection1Data,
  setCurrentSection,
}) => {
  const [paymentMethod, setPaymentMethod] = useState(
    Section1Data.paymentMethod,
  );

  useEffect(() => {
    setValue("paymentMethod", paymentMethod);
    clearErrors("paymentMethod");
  }, [paymentMethod]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    register,
    clearErrors
  } = useForm<Section1Type>({
    resolver: zodResolver(DepositDetailsSchema),
    defaultValues: Section1Data,
    mode: "onChange",
  });

  const scheduleDeposit = watch("scheduleDeposit");

  const onSubmit = (data: Section1Type) => {
    setSection1Data(data);
    setCurrentSection(2);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-4">
        <CardHeader>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <div className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            Deposit Details
          </h2>
        </CardHeader>
        <CardBody className="space-y-6">
          {/* Deposit Amount */}
          <div className="grid gap-2">
            {/* @ts-ignore */}
            <NumberInput
              {...register("amount")}
              hideStepper
              className="text-right rounded-none"
              errorMessage={errors.amount?.message}
              id="amount"
              isInvalid={!!errors.amount}
              label="Deposit Amount *"
              labelPlacement="outside"
              maxValue={1000000}
              minValue={1000}
              placeholder="Enter amount"
              startContent={"€"}
              type="text"
              variant="flat"
            />

            <p className="text-xs text-gray-500">
              Minimum: €1000 | Maximum: €10,00,000
            </p>
          </div>
          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {[1000, 25000, 50000, 75000].map((amount) => (
              <Button
                key={amount}
                className="text-xs"
                size="sm"
                type="button"
                variant="bordered"
                onPress={() => setValue("amount", amount.toString())}
              >
                €{amount.toLocaleString()}
              </Button>
            ))}
          </div>
          <div className="grid gap-2">
            <label htmlFor="purpose">Deposit Purpose (Optional)</label>
            <Select
              {...register("purpose")}
              aria-label="Deposit Purpose"
              className="w-full"
              errorMessage={errors.purpose?.message}
              isInvalid={!!errors.purpose}
              placeholder="Select purpose"
              variant="flat"
            >
              <SelectItem key="investing">Investing</SelectItem>
              <SelectItem key="advisory">Advisory Access</SelectItem>
              <SelectItem key="learning">Learning</SelectItem>
              <SelectItem key="goal">Save for Goal</SelectItem>
            </Select>
          </div>
          <div className="grid gap-2">
            <p>Payment Method *</p>
            <RadioGroup
              defaultValue={Section1Data.paymentMethod}
              errorMessage={errors.paymentMethod?.message}
              isInvalid={!!errors.paymentMethod}
              name="paymentMethod"
              value={paymentMethod}
              onValueChange={setPaymentMethod}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                  <Radio id="spea" value="spea" />
                  <label
                    className="flex items-center cursor-pointer"
                    htmlFor="spea"
                  >
                    <div className="w-8 h-8 mr-3 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                      S
                    </div>
                    <div>
                      <div className="font-medium">SEPA</div>
                      <div className="text-xs text-gray-500">
                        Instant transfer
                      </div>
                    </div>
                  </label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                  <Radio id="card" value="card" />
                  <label
                    className="flex items-center cursor-pointer"
                    htmlFor="card"
                  >
                    <div className="w-8 h-8 mr-3 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                      C
                    </div>
                    <div>
                      <div className="font-medium">Debit Card</div>
                      <div className="text-xs text-gray-500">
                        Secure payment
                      </div>
                    </div>
                  </label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                  <Radio id="netbanking" value="netbanking" />
                  <label
                    className="flex items-center cursor-pointer"
                    htmlFor="netbanking"
                  >
                    <div className="w-8 h-8 mr-3 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                      N
                    </div>
                    <div>
                      <div className="font-medium">Net Banking</div>
                      <div className="text-xs text-gray-500">Bank transfer</div>
                    </div>
                  </label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                  <Radio id="wallet" value="wallet" />
                  <label
                    className="flex items-center cursor-pointer"
                    htmlFor="wallet"
                  >
                    <div className="w-8 h-8 mr-3 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">
                      W
                    </div>
                    <div>
                      <div className="font-medium">Digital Wallet</div>
                      <div className="text-xs text-gray-500">Quick & easy</div>
                    </div>
                  </label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-4 pb-4">
            <div className="flex items-center justify-between">
              <label htmlFor="schedule">Schedule Recurring Deposit?</label>
              <Switch {...register("scheduleDeposit")} id="schedule" />
            </div>

            {scheduleDeposit && (
              <div className="grid gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid gap-2">
                  <label htmlFor="interval">Recurring Interval *</label>
                  <Select
                    {...register("recurringInterval")}
                    aria-label="Recurring Interval"
                    className="w-full"
                    errorMessage={errors.recurringInterval?.message}
                    isInvalid={!!errors.recurringInterval}
                    placeholder="Select interval"
                    variant="flat"
                  >
                    <SelectItem key="daily">Daily</SelectItem>
                    <SelectItem key="weekly">Weekly</SelectItem>
                    <SelectItem key="monthly">Monthly</SelectItem>
                  </Select>
                  {errors.recurringInterval && (
                    <p className="text-sm text-red-500">
                      {errors.recurringInterval.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <p>End Date (Optional)</p>
                  <Controller
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            className={cn(
                              "justify-start text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                            variant="bordered"
                          >
                            {field.value
                              ? format(field.value, "PPP")
                              : "Select end date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            value={
                              field.value ? fromDate(field.value, "UTC") : null
                            }
                            onChange={(dateValue) => {
                              // Convert the CalendarDate to JS Date if needed, or store as is
                              field.onChange(
                                dateValue
                                  ? (dateValue.toDate?.() ?? dateValue)
                                  : undefined,
                              );
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      <div className="flex justify-end">
        <Button
          className="bg-primary-500 hover:bg-rose-600 text-white"
          color="primary"
          type="submit"
        >
          Next: Personal Information
        </Button>
      </div>
    </form>
  );
};

export default Section1;
