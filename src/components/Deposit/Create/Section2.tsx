import React, { useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  Textarea,
  Calendar,
} from "@heroui/react";
import { cn } from "@heroui/react";
import { fromDate, getLocalTimeZone, today } from "@internationalized/date";
import { useDropzone } from "react-dropzone";

import { Section2 as Section2Type } from "@/types/Deposit";
import { DepositOtherDetailsSchema } from "@/schemas/Deposit";

interface Section2Props {
  Section2Data: Section2Type;
  setSection2Data: React.Dispatch<React.SetStateAction<Section2Type>>;
  setCurrentSection: (section: number) => void;
}

const Section2: React.FC<Section2Props> = ({
  Section2Data,
  setSection2Data,
  setCurrentSection,
}) => {
  const [otpSent, setOtpSent] = useState(false);
  const [AddressProofFile, setAddressProofFile] = useState<File | undefined>();
  const [PersonalIdFile, setPersonalIdFile] = useState<File | undefined>();
  const [BankStatementFile, setBankStatementFile] = useState<
    File | undefined
  >();
  const [IncomeProofFile, setIncomeProofFile] = useState<File | undefined>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    register,
  } = useForm<Section2Type>({
    resolver: zodResolver(DepositOtherDetailsSchema),
    defaultValues: Section2Data,
    mode: "onChange",
  });

  const onDropAddressProof = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];

      setAddressProofFile(file);
      setValue("uploadedDocuments.addressProof", file.name);
    },
    [setAddressProofFile],
  );

  const onDropPersonalId = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];

      setPersonalIdFile(file);
      setValue("uploadedDocuments.personalId", file.name);
    },
    [setPersonalIdFile],
  );

  const onDropBankStatement = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];

      setBankStatementFile(file);
      setValue("uploadedDocuments.bankStatement", file.name);
    },
    [setBankStatementFile],
  );

  const onDropIncomeProof = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];

      setIncomeProofFile(file);
      setValue("uploadedDocuments.incomeProof", file.name);
    },
    [setIncomeProofFile],
  );

  const {
    getRootProps: getRootPropsAddressProof,
    getInputProps: getInputPropsAddressProof,
    isDragActive: getInputPropsAddressDrag,
  } = useDropzone({
    onDrop: onDropAddressProof,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: 15 * 1024 * 1024,
  });

  const {
    getRootProps: getRootPropsPersonalId,
    getInputProps: getInputPropsPersonalId,
    isDragActive: getInputPropsPersonalIdDrag,
  } = useDropzone({
    onDrop: onDropPersonalId,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: 15 * 1024 * 1024,
  });

  const {
    getRootProps: getRootPropsBankStatement,
    getInputProps: getInputPropsBankStatement,
    isDragActive: getInputPropsBankStatementDrag,
  } = useDropzone({
    onDrop: onDropBankStatement,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: 15 * 1024 * 1024,
  });

  const {
    getRootProps: getRootPropsIncomeProof,
    getInputProps: getInputPropsIncomeProof,
    isDragActive: getInputPropsIncomeProofDrag,
  } = useDropzone({
    onDrop: onDropIncomeProof,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: 15 * 1024 * 1024,
  });

  const sendOTP = () => {
    if (watch("mobileNumber")) {
      setOtpSent(true);
      setTimeout(() => {
        alert("OTP sent to " + watch("mobileNumber"));
      }, 500);
    }
  };

  const onSubmit = (data: Section2Type) => {
    //@ts-ignore Temporary time for transfering files to the backend
    data.attachedFiles = {
      personalid: PersonalIdFile,
      bankstatemet: BankStatementFile,
      AddressProof: AddressProofFile,
      IncomeProof: IncomeProofFile,
    };

    setSection2Data(data);
    setCurrentSection(3);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-4">
        <CardHeader>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <div className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            Personal Information &amp; KYC Details
          </h2>
        </CardHeader>
        <CardBody className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg flex items-center gap-2">
              {/* ...icon... */}
              Basic Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="fullName">Full Name (as per bank) *</label>
                <Input
                  id="fullName"
                  placeholder="Enter full name"
                  variant="flat"
                  {...register("fullName")}
                  errorMessage={errors.fullName?.message}
                  isInvalid={!!errors.fullName}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="dob">Date of Birth *</label>
                <Controller
                  control={control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className={cn(
                            "justify-start text-left font-normal ",
                            !field.value && "text-gray-500",
                            errors.dateOfBirth && "bg-danger-50",
                          )}
                          variant="flat"
                        >
                          {field.value
                            ? format(field.value, "PPP")
                            : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          showMonthAndYearPickers
                          errorMessage={errors.dateOfBirth?.message}
                          isInvalid={!!errors.dateOfBirth}
                          maxValue={today(getLocalTimeZone()).subtract({
                            years: 18,
                          })}
                          value={
                            field.value ? fromDate(field.value, "UTC") : null
                          }
                          onChange={(dateValue) => {
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
                {errors.dateOfBirth && (
                  <p className="text-xs text-primary-500">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label htmlFor="fatherName">Father&apos;s Name</label>
                <Input
                  id="fatherName"
                  placeholder="Enter father's name"
                  variant="flat"
                  {...register("fatherName")}
                  errorMessage={errors.fatherName?.message}
                  isInvalid={!!errors.fatherName}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="motherName">Mother&apos;s Name</label>
                <Input
                  errorMessage={errors.motherName?.message}
                  id="motherName"
                  isInvalid={!!errors.motherName}
                  placeholder="Enter mother's name"
                  variant="flat"
                  {...register("motherName")}
                />
              </div>
            </div>
          </div>
          <Divider />
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="mobileNumber">Mobile Number *</label>
                <Input
                  id="mobileNumber"
                  maxLength={8}
                  placeholder="e.g., 98841216"
                  type="tel"
                  variant="flat"
                  {...register("mobileNumber")}
                  errorMessage={errors.mobileNumber?.message}
                  isInvalid={!!errors.mobileNumber}
                />
                <Button
                  color="secondary"
                  disabled={otpSent || watch("mobileNumber")?.length !== 8}
                  size="sm"
                  type="button"
                  onPress={sendOTP}
                >
                  {otpSent ? "Confirmation Sent!" : "Send Confirmation"}
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="mobileNumber">OTP Number </label>
                <Input
                  id="mobileNumber"
                  maxLength={10}
                  placeholder="Enter the number received by sms"
                  type="tel"
                  variant="flat"
                />
              </div>
            </div>
          </div>
          <Divider />
          {/* Residential Address */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Residential Address</h3>
            <div className="grid gap-2">
              <label htmlFor="address">Address Line</label>
              <Textarea
                errorMessage={errors.address?.message}
                id="address"
                isInvalid={!!errors.address}
                placeholder="Street, Building, Apartment"
                variant="flat"
                {...register("address")}
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <label htmlFor="city">City</label>
                <Input
                  errorMessage={errors.city?.message}
                  id="city"
                  isInvalid={!!errors.city}
                  placeholder="City"
                  variant="flat"
                  {...register("city")}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="state">State</label>
                <Input
                  errorMessage={errors.state?.message}
                  id="state"
                  isInvalid={!!errors.state}
                  placeholder="State"
                  variant="flat"
                  {...register("state")}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="pincode">Pincode</label>
                <Input
                  errorMessage={errors.pincode?.message}
                  id="pincode"
                  isInvalid={!!errors.pincode}
                  maxLength={6}
                  placeholder="Pincode"
                  variant="flat"
                  {...register("pincode")}
                />
              </div>
            </div>
          </div>
          <Divider />
          {/* Professional & Financial Details */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">
              Professional &amp; Financial Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="occupation">Occupation</label>
                <Input
                  errorMessage={errors.occupation?.message}
                  id="occupation"
                  isInvalid={!!errors.occupation}
                  placeholder="Your occupation"
                  variant="flat"
                  {...register("occupation")}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="annualIncome">Annual Income</label>
                <Select
                  className="w-full"
                  placeholder="Select income range"
                  variant="flat"
                  {...register("annualIncome")}
                  errorMessage={errors.annualIncome?.message}
                  isInvalid={!!errors.annualIncome}
                >
                  <SelectItem key="0-25k">{"< €25,000 Euros"}</SelectItem>
                  <SelectItem key="25k-40k">€25,000 - €40,000 Euros</SelectItem>
                  <SelectItem key="40k-60k">€40,000 - €60,000 Euros</SelectItem>
                  <SelectItem key="60k-80k">€60,000 - €80,000 Euros</SelectItem>
                  <SelectItem key="80k-120k">
                    €80,000 - €120,000 Euros
                  </SelectItem>
                  <SelectItem key="120k+">{"> €120,000 Euros"}</SelectItem>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="sourceOfIncome">Source of Income</label>
                <Input
                  errorMessage={errors.sourceOfIncome?.message}
                  id="sourceOfIncome"
                  isInvalid={!!errors.sourceOfIncome}
                  placeholder="e.g., Salary, Business"
                  variant="flat"
                  {...register("sourceOfIncome")}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="taxStatus">Tax Status</label>
                <Select
                  {...register("taxStatus")}
                  className="w-full"
                  errorMessage={errors.taxStatus?.message}
                  isInvalid={!!errors.taxStatus}
                  placeholder="Select tax status"
                  variant="flat"
                >
                  <SelectItem key="resident">Resident Taxpayer</SelectItem>
                  <SelectItem key="non-resident">
                    Non-Resident Taxpayer
                  </SelectItem>
                  <SelectItem key="company">Corporate Entity</SelectItem>
                  <SelectItem key="self-employed">
                    Self-Employed / Sole Trader
                  </SelectItem>
                </Select>
              </div>
            </div>
          </div>
          <Divider />
          {/* Bank Account Details & Identification */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">
              Bank Account Details &amp; Identification
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="bankName">Bank name</label>
                <Input
                  errorMessage={errors.bankName?.message}
                  id="bankName"
                  isInvalid={!!errors.bankName}
                  placeholder="Bank Name"
                  variant="flat"
                  {...register("bankName")}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="ibanCode">IBAN Code</label>
                <Input
                  errorMessage={errors.ibanCode?.message}
                  id="ibanCode"
                  isInvalid={!!errors.ibanCode}
                  maxLength={11}
                  placeholder="e.g., GB88MIDL0700..."
                  variant="flat"
                  {...register("ibanCode")}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="bicId">BIC ID</label>
                <Input
                  errorMessage={errors.bicId?.message}
                  id="bicId"
                  isInvalid={!!errors.bicId}
                  placeholder="e.g., DABADEMMXXX"
                  variant="flat"
                  {...register("bicId")}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="personalId">National ID / Passport</label>
                <Input
                  errorMessage={errors.personalId?.message}
                  id="personalId"
                  isInvalid={!!errors.personalId}
                  maxLength={11}
                  placeholder="e.g., 4b2k3a9n"
                  variant="flat"
                  {...register("personalId")}
                />
              </div>
            </div>
          </div>
          <Divider />
          {/* Nominee Details (Optional) */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Nominee Details (Optional)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="nomineeName">Nominee&apos;s Full Name</label>
                <Controller
                  control={control}
                  name="nomineeDetails.name"
                  render={({ field }) => (
                    <Input
                      id="nomineeName"
                      placeholder="Enter nominee's full name"
                      variant="flat"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="nomineeRelationship">Relationship</label>
                <Controller
                  control={control}
                  name="nomineeDetails.relationship"
                  render={({ field }) => (
                    <Input
                      id="nomineeRelationship"
                      placeholder="e.g., Mother, Spouse"
                      variant="flat"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <label htmlFor="nomineeDob">Nominee&apos;s Date of Birth</label>
                <Controller
                  control={control}
                  name="nomineeDetails.dateOfBirth"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className={cn(
                            "justify-start text-left font-normal",
                            !field.value && "text-gray-500",
                          )}
                          variant="flat"
                        >
                          {field.value
                            ? format(field.value, "PPP")
                            : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          value={
                            field.value ? fromDate(field.value, "UTC") : null
                          }
                          onChange={(dateValue) => {
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
          </div>
          <Divider />
          {/* Document Upload */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Document Upload</h3>
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="flex flex-col">
                <p className="mb-2">Personal ID (Passport/National ID)</p>
                <div
                  {...getRootPropsPersonalId()}
                  className={`w-full py-9 bg-gray-100 hover:bg-gray-200 rounded-2xl border border-gray-300 gap-3 grid border-dashed cursor-pointer ${
                    getInputPropsPersonalIdDrag ? "bg-gray-200" : ""
                  }`}
                >
                  <input
                    name="uploadedDocuments.personalId"
                    {...getInputPropsPersonalId()}
                  />
                  <div className="grid gap-1">
                    <svg
                      className="mx-auto"
                      fill="none"
                      height="40"
                      viewBox="0 0 40 40"
                      width="40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <svg
                        className="mx-auto"
                        fill="none"
                        height="40"
                        viewBox="0 0 40 40"
                        width="40"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="File">
                          <path
                            d="M31.6497 10.6056L32.2476 10.0741L31.6497 10.6056ZM28.6559 7.23757L28.058 7.76907L28.058 7.76907L28.6559 7.23757ZM26.5356 5.29253L26.2079 6.02233L26.2079 6.02233L26.5356 5.29253ZM33.1161 12.5827L32.3683 12.867V12.867L33.1161 12.5827ZM31.8692 33.5355L32.4349 34.1012L31.8692 33.5355ZM24.231 11.4836L25.0157 11.3276L24.231 11.4836ZM26.85 14.1026L26.694 14.8872L26.85 14.1026ZM11.667 20.8667C11.2252 20.8667 10.867 21.2248 10.867 21.6667C10.867 22.1085 11.2252 22.4667 11.667 22.4667V20.8667ZM25.0003 22.4667C25.4422 22.4667 25.8003 22.1085 25.8003 21.6667C25.8003 21.2248 25.4422 20.8667 25.0003 20.8667V22.4667ZM11.667 25.8667C11.2252 25.8667 10.867 26.2248 10.867 26.6667C10.867 27.1085 11.2252 27.4667 11.667 27.4667V25.8667ZM20.0003 27.4667C20.4422 27.4667 20.8003 27.1085 20.8003 26.6667C20.8003 26.2248 20.4422 25.8667 20.0003 25.8667V27.4667ZM23.3337 34.2H16.667V35.8H23.3337V34.2ZM7.46699 25V15H5.86699V25H7.46699ZM32.5337 15.0347V25H34.1337V15.0347H32.5337ZM16.667 5.8H23.6732V4.2H16.667V5.8ZM23.6732 5.8C25.2185 5.8 25.7493 5.81639 26.2079 6.02233L26.8633 4.56274C26.0191 4.18361 25.0759 4.2 23.6732 4.2V5.8ZM29.2539 6.70608C28.322 5.65771 27.7076 4.94187 26.8633 4.56274L26.2079 6.02233C26.6665 6.22826 27.0314 6.6141 28.058 7.76907L29.2539 6.70608ZM34.1337 15.0347C34.1337 13.8411 34.1458 13.0399 33.8638 12.2984L32.3683 12.867C32.5216 13.2702 32.5337 13.7221 32.5337 15.0347H34.1337ZM31.0518 11.1371C31.9238 12.1181 32.215 12.4639 32.3683 12.867L33.8638 12.2984C33.5819 11.5569 33.0406 10.9662 32.2476 10.0741L31.0518 11.1371ZM16.667 34.2C14.2874 34.2 12.5831 34.1983 11.2872 34.0241C10.0144 33.8529 9.25596 33.5287 8.69714 32.9698L7.56577 34.1012C8.47142 35.0069 9.62375 35.4148 11.074 35.6098C12.5013 35.8017 14.3326 35.8 16.667 35.8V34.2ZM5.86699 25C5.86699 27.3344 5.86529 29.1657 6.05718 30.593C6.25217 32.0432 6.66012 33.1956 7.56577 34.1012L8.69714 32.9698C8.13833 32.411 7.81405 31.6526 7.64292 30.3798C7.46869 29.0839 7.46699 27.3796 7.46699 25H5.86699ZM23.3337 35.8C25.6681 35.8 27.4993 35.8017 28.9266 35.6098C30.3769 35.4148 31.5292 35.0069 32.4349 34.1012L31.3035 32.9698C30.7447 33.5287 29.9863 33.8529 28.7134 34.0241C27.4175 34.1983 25.7133 34.2 23.3337 34.2V35.8ZM32.5337 25C32.5337 27.3796 32.532 29.0839 32.3577 30.3798C32.1866 31.6526 31.8623 32.411 31.3035 32.9698L32.4349 34.1012C33.3405 33.1956 33.7485 32.0432 33.9435 30.593C34.1354 29.1657 34.1337 27.3344 34.1337 25H32.5337ZM7.46699 15C7.46699 12.6204 7.46869 10.9161 7.64292 9.62024C7.81405 8.34738 8.13833 7.58897 8.69714 7.03015L7.56577 5.89878C6.66012 6.80443 6.25217 7.95676 6.05718 9.40704C5.86529 10.8343 5.86699 12.6656 5.86699 15H7.46699ZM16.667 4.2C14.3326 4.2 12.5013 4.1983 11.074 4.39019C9.62375 4.58518 8.47142 4.99313 7.56577 5.89878L8.69714 7.03015C9.25596 6.47133 10.0144 6.14706 11.2872 5.97592C12.5831 5.8017 14.2874 5.8 16.667 5.8V4.2ZM23.367 5V10H24.967V5H23.367ZM28.3337 14.9667H33.3337V13.3667H28.3337V14.9667ZM23.367 10C23.367 10.7361 23.3631 11.221 23.4464 11.6397L25.0157 11.3276C24.9709 11.1023 24.967 10.8128 24.967 10H23.367ZM28.3337 13.3667C27.5209 13.3667 27.2313 13.3628 27.0061 13.318L26.694 14.8872C27.1127 14.9705 27.5976 14.9667 28.3337 14.9667V13.3667ZM23.4464 11.6397C23.7726 13.2794 25.0543 14.5611 26.694 14.8872L27.0061 13.318C26.0011 13.1181 25.2156 12.3325 25.0157 11.3276L23.4464 11.6397ZM11.667 22.4667H25.0003V20.8667H11.667V22.4667ZM11.667 27.4667H20.0003V25.8667H11.667V27.4667ZM32.2476 10.0741L29.2539 6.70608L28.058 7.76907L31.0518 11.1371L32.2476 10.0741Z"
                            fill="#e63356"
                            id="icon"
                          />
                        </g>
                      </svg>
                    </svg>
                    <h2 className="text-center text-gray-400 text-xs leading-4">
                      PNG, JPG or PDF, smaller than 15MB
                    </h2>
                  </div>
                  <div className="grid gap-2">
                    <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">
                      {getInputPropsPersonalIdDrag
                        ? "Drop the file here ..."
                        : "Drag and Drop your file here or"}
                    </h4>
                    <div className="flex items-center justify-center">
                      <div className="flex w-28 h-9 px-2 flex-col bg-primary-500 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
                        Choose File
                      </div>
                    </div>
                  </div>
                </div>
                {PersonalIdFile && (
                  <span className="text-xs text-gray-500 mt-2">
                    {PersonalIdFile.name} (
                    {(PersonalIdFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <p className="mb-2">Address Proof</p>
                <div
                  {...getRootPropsAddressProof()}
                  className={`w-full py-9 bg-gray-100 hover:bg-gray-200 rounded-2xl border border-gray-300 gap-3 grid border-dashed cursor-pointer ${
                    getInputPropsAddressDrag ? "bg-gray-200" : ""
                  }`}
                >
                  <input
                    name="uploadedDocuments.addressProof"
                    {...getInputPropsAddressProof()}
                  />
                  <div className="grid gap-1">
                    <svg
                      className="mx-auto"
                      fill="none"
                      height="40"
                      viewBox="0 0 40 40"
                      width="40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <svg
                        className="mx-auto"
                        fill="none"
                        height="40"
                        viewBox="0 0 40 40"
                        width="40"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="File">
                          <path
                            d="M31.6497 10.6056L32.2476 10.0741L31.6497 10.6056ZM28.6559 7.23757L28.058 7.76907L28.058 7.76907L28.6559 7.23757ZM26.5356 5.29253L26.2079 6.02233L26.2079 6.02233L26.5356 5.29253ZM33.1161 12.5827L32.3683 12.867V12.867L33.1161 12.5827ZM31.8692 33.5355L32.4349 34.1012L31.8692 33.5355ZM24.231 11.4836L25.0157 11.3276L24.231 11.4836ZM26.85 14.1026L26.694 14.8872L26.85 14.1026ZM11.667 20.8667C11.2252 20.8667 10.867 21.2248 10.867 21.6667C10.867 22.1085 11.2252 22.4667 11.667 22.4667V20.8667ZM25.0003 22.4667C25.4422 22.4667 25.8003 22.1085 25.8003 21.6667C25.8003 21.2248 25.4422 20.8667 25.0003 20.8667V22.4667ZM11.667 25.8667C11.2252 25.8667 10.867 26.2248 10.867 26.6667C10.867 27.1085 11.2252 27.4667 11.667 27.4667V25.8667ZM20.0003 27.4667C20.4422 27.4667 20.8003 27.1085 20.8003 26.6667C20.8003 26.2248 20.4422 25.8667 20.0003 25.8667V27.4667ZM23.3337 34.2H16.667V35.8H23.3337V34.2ZM7.46699 25V15H5.86699V25H7.46699ZM32.5337 15.0347V25H34.1337V15.0347H32.5337ZM16.667 5.8H23.6732V4.2H16.667V5.8ZM23.6732 5.8C25.2185 5.8 25.7493 5.81639 26.2079 6.02233L26.8633 4.56274C26.0191 4.18361 25.0759 4.2 23.6732 4.2V5.8ZM29.2539 6.70608C28.322 5.65771 27.7076 4.94187 26.8633 4.56274L26.2079 6.02233C26.6665 6.22826 27.0314 6.6141 28.058 7.76907L29.2539 6.70608ZM34.1337 15.0347C34.1337 13.8411 34.1458 13.0399 33.8638 12.2984L32.3683 12.867C32.5216 13.2702 32.5337 13.7221 32.5337 15.0347H34.1337ZM31.0518 11.1371C31.9238 12.1181 32.215 12.4639 32.3683 12.867L33.8638 12.2984C33.5819 11.5569 33.0406 10.9662 32.2476 10.0741L31.0518 11.1371ZM16.667 34.2C14.2874 34.2 12.5831 34.1983 11.2872 34.0241C10.0144 33.8529 9.25596 33.5287 8.69714 32.9698L7.56577 34.1012C8.47142 35.0069 9.62375 35.4148 11.074 35.6098C12.5013 35.8017 14.3326 35.8 16.667 35.8V34.2ZM5.86699 25C5.86699 27.3344 5.86529 29.1657 6.05718 30.593C6.25217 32.0432 6.66012 33.1956 7.56577 34.1012L8.69714 32.9698C8.13833 32.411 7.81405 31.6526 7.64292 30.3798C7.46869 29.0839 7.46699 27.3796 7.46699 25H5.86699ZM23.3337 35.8C25.6681 35.8 27.4993 35.8017 28.9266 35.6098C30.3769 35.4148 31.5292 35.0069 32.4349 34.1012L31.3035 32.9698C30.7447 33.5287 29.9863 33.8529 28.7134 34.0241C27.4175 34.1983 25.7133 34.2 23.3337 34.2V35.8ZM32.5337 25C32.5337 27.3796 32.532 29.0839 32.3577 30.3798C32.1866 31.6526 31.8623 32.411 31.3035 32.9698L32.4349 34.1012C33.3405 33.1956 33.7485 32.0432 33.9435 30.593C34.1354 29.1657 34.1337 27.3344 34.1337 25H32.5337ZM7.46699 15C7.46699 12.6204 7.46869 10.9161 7.64292 9.62024C7.81405 8.34738 8.13833 7.58897 8.69714 7.03015L7.56577 5.89878C6.66012 6.80443 6.25217 7.95676 6.05718 9.40704C5.86529 10.8343 5.86699 12.6656 5.86699 15H7.46699ZM16.667 4.2C14.3326 4.2 12.5013 4.1983 11.074 4.39019C9.62375 4.58518 8.47142 4.99313 7.56577 5.89878L8.69714 7.03015C9.25596 6.47133 10.0144 6.14706 11.2872 5.97592C12.5831 5.8017 14.2874 5.8 16.667 5.8V4.2ZM23.367 5V10H24.967V5H23.367ZM28.3337 14.9667H33.3337V13.3667H28.3337V14.9667ZM23.367 10C23.367 10.7361 23.3631 11.221 23.4464 11.6397L25.0157 11.3276C24.9709 11.1023 24.967 10.8128 24.967 10H23.367ZM28.3337 13.3667C27.5209 13.3667 27.2313 13.3628 27.0061 13.318L26.694 14.8872C27.1127 14.9705 27.5976 14.9667 28.3337 14.9667V13.3667ZM23.4464 11.6397C23.7726 13.2794 25.0543 14.5611 26.694 14.8872L27.0061 13.318C26.0011 13.1181 25.2156 12.3325 25.0157 11.3276L23.4464 11.6397ZM11.667 22.4667H25.0003V20.8667H11.667V22.4667ZM11.667 27.4667H20.0003V25.8667H11.667V27.4667ZM32.2476 10.0741L29.2539 6.70608L28.058 7.76907L31.0518 11.1371L32.2476 10.0741Z"
                            fill="#e63356"
                            id="icon"
                          />
                        </g>
                      </svg>
                    </svg>
                    <h2 className="text-center text-gray-400 text-xs leading-4">
                      PNG, JPG or PDF, smaller than 15MB
                    </h2>
                  </div>
                  <div className="grid gap-2">
                    <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">
                      {getInputPropsAddressDrag
                        ? "Drop the file here ..."
                        : "Drag and Drop your file here or"}
                    </h4>
                    <div className="flex items-center justify-center">
                      <div className="flex w-28 h-9 px-2 flex-col bg-primary-500 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
                        Choose File
                      </div>
                    </div>
                  </div>
                </div>
                {AddressProofFile && (
                  <span className="text-xs text-gray-500 mt-2">
                    {AddressProofFile.name} (
                    {(AddressProofFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <p className="mb-2">Bank Statement</p>
                <div
                  {...getRootPropsBankStatement()}
                  className={`w-full py-9 bg-gray-100 hover:bg-gray-200 rounded-2xl border border-gray-300 gap-3 grid border-dashed cursor-pointer ${
                    getInputPropsBankStatementDrag ? "bg-gray-200" : ""
                  }`}
                >
                  <input
                    name="uploadedDocuments.bankStatement"
                    {...getInputPropsBankStatement()}
                  />
                  <div className="grid gap-1">
                    <svg
                      className="mx-auto"
                      fill="none"
                      height="40"
                      viewBox="0 0 40 40"
                      width="40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <svg
                        className="mx-auto"
                        fill="none"
                        height="40"
                        viewBox="0 0 40 40"
                        width="40"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="File">
                          <path
                            d="M31.6497 10.6056L32.2476 10.0741L31.6497 10.6056ZM28.6559 7.23757L28.058 7.76907L28.058 7.76907L28.6559 7.23757ZM26.5356 5.29253L26.2079 6.02233L26.2079 6.02233L26.5356 5.29253ZM33.1161 12.5827L32.3683 12.867V12.867L33.1161 12.5827ZM31.8692 33.5355L32.4349 34.1012L31.8692 33.5355ZM24.231 11.4836L25.0157 11.3276L24.231 11.4836ZM26.85 14.1026L26.694 14.8872L26.85 14.1026ZM11.667 20.8667C11.2252 20.8667 10.867 21.2248 10.867 21.6667C10.867 22.1085 11.2252 22.4667 11.667 22.4667V20.8667ZM25.0003 22.4667C25.4422 22.4667 25.8003 22.1085 25.8003 21.6667C25.8003 21.2248 25.4422 20.8667 25.0003 20.8667V22.4667ZM11.667 25.8667C11.2252 25.8667 10.867 26.2248 10.867 26.6667C10.867 27.1085 11.2252 27.4667 11.667 27.4667V25.8667ZM20.0003 27.4667C20.4422 27.4667 20.8003 27.1085 20.8003 26.6667C20.8003 26.2248 20.4422 25.8667 20.0003 25.8667V27.4667ZM23.3337 34.2H16.667V35.8H23.3337V34.2ZM7.46699 25V15H5.86699V25H7.46699ZM32.5337 15.0347V25H34.1337V15.0347H32.5337ZM16.667 5.8H23.6732V4.2H16.667V5.8ZM23.6732 5.8C25.2185 5.8 25.7493 5.81639 26.2079 6.02233L26.8633 4.56274C26.0191 4.18361 25.0759 4.2 23.6732 4.2V5.8ZM29.2539 6.70608C28.322 5.65771 27.7076 4.94187 26.8633 4.56274L26.2079 6.02233C26.6665 6.22826 27.0314 6.6141 28.058 7.76907L29.2539 6.70608ZM34.1337 15.0347C34.1337 13.8411 34.1458 13.0399 33.8638 12.2984L32.3683 12.867C32.5216 13.2702 32.5337 13.7221 32.5337 15.0347H34.1337ZM31.0518 11.1371C31.9238 12.1181 32.215 12.4639 32.3683 12.867L33.8638 12.2984C33.5819 11.5569 33.0406 10.9662 32.2476 10.0741L31.0518 11.1371ZM16.667 34.2C14.2874 34.2 12.5831 34.1983 11.2872 34.0241C10.0144 33.8529 9.25596 33.5287 8.69714 32.9698L7.56577 34.1012C8.47142 35.0069 9.62375 35.4148 11.074 35.6098C12.5013 35.8017 14.3326 35.8 16.667 35.8V34.2ZM5.86699 25C5.86699 27.3344 5.86529 29.1657 6.05718 30.593C6.25217 32.0432 6.66012 33.1956 7.56577 34.1012L8.69714 32.9698C8.13833 32.411 7.81405 31.6526 7.64292 30.3798C7.46869 29.0839 7.46699 27.3796 7.46699 25H5.86699ZM23.3337 35.8C25.6681 35.8 27.4993 35.8017 28.9266 35.6098C30.3769 35.4148 31.5292 35.0069 32.4349 34.1012L31.3035 32.9698C30.7447 33.5287 29.9863 33.8529 28.7134 34.0241C27.4175 34.1983 25.7133 34.2 23.3337 34.2V35.8ZM32.5337 25C32.5337 27.3796 32.532 29.0839 32.3577 30.3798C32.1866 31.6526 31.8623 32.411 31.3035 32.9698L32.4349 34.1012C33.3405 33.1956 33.7485 32.0432 33.9435 30.593C34.1354 29.1657 34.1337 27.3344 34.1337 25H32.5337ZM7.46699 15C7.46699 12.6204 7.46869 10.9161 7.64292 9.62024C7.81405 8.34738 8.13833 7.58897 8.69714 7.03015L7.56577 5.89878C6.66012 6.80443 6.25217 7.95676 6.05718 9.40704C5.86529 10.8343 5.86699 12.6656 5.86699 15H7.46699ZM16.667 4.2C14.3326 4.2 12.5013 4.1983 11.074 4.39019C9.62375 4.58518 8.47142 4.99313 7.56577 5.89878L8.69714 7.03015C9.25596 6.47133 10.0144 6.14706 11.2872 5.97592C12.5831 5.8017 14.2874 5.8 16.667 5.8V4.2ZM23.367 5V10H24.967V5H23.367ZM28.3337 14.9667H33.3337V13.3667H28.3337V14.9667ZM23.367 10C23.367 10.7361 23.3631 11.221 23.4464 11.6397L25.0157 11.3276C24.9709 11.1023 24.967 10.8128 24.967 10H23.367ZM28.3337 13.3667C27.5209 13.3667 27.2313 13.3628 27.0061 13.318L26.694 14.8872C27.1127 14.9705 27.5976 14.9667 28.3337 14.9667V13.3667ZM23.4464 11.6397C23.7726 13.2794 25.0543 14.5611 26.694 14.8872L27.0061 13.318C26.0011 13.1181 25.2156 12.3325 25.0157 11.3276L23.4464 11.6397ZM11.667 22.4667H25.0003V20.8667H11.667V22.4667ZM11.667 27.4667H20.0003V25.8667H11.667V27.4667ZM32.2476 10.0741L29.2539 6.70608L28.058 7.76907L31.0518 11.1371L32.2476 10.0741Z"
                            fill="#e63356"
                            id="icon"
                          />
                        </g>
                      </svg>
                    </svg>
                    <h2 className="text-center text-gray-400 text-xs leading-4">
                      PNG, JPG or PDF, smaller than 15MB
                    </h2>
                  </div>
                  <div className="grid gap-2">
                    <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">
                      {getInputPropsBankStatementDrag
                        ? "Drop the file here ..."
                        : "Drag and Drop your file here or"}
                    </h4>
                    <div className="flex items-center justify-center">
                      <div className="flex w-28 h-9 px-2 flex-col bg-primary-500 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
                        Choose File
                      </div>
                    </div>
                  </div>
                </div>
                {BankStatementFile && (
                  <span className="text-xs text-gray-500 mt-2">
                    {BankStatementFile.name} (
                    {(BankStatementFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <p className="mb-2">Income Proof</p>
                <div
                  {...getRootPropsIncomeProof()}
                  className={`w-full py-9 bg-gray-100 hover:bg-gray-200 rounded-2xl border border-gray-300 gap-3 grid border-dashed cursor-pointer ${
                    getInputPropsIncomeProofDrag ? "bg-gray-200" : ""
                  }`}
                >
                  <input
                    name="uploadedDocuments.incomeProof"
                    {...getInputPropsIncomeProof()}
                  />
                  <div className="grid gap-1">
                    <svg
                      className="mx-auto"
                      fill="none"
                      height="40"
                      viewBox="0 0 40 40"
                      width="40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="File">
                        <path
                          d="M31.6497 10.6056L32.2476 10.0741L31.6497 10.6056ZM28.6559 7.23757L28.058 7.76907L28.058 7.76907L28.6559 7.23757ZM26.5356 5.29253L26.2079 6.02233L26.2079 6.02233L26.5356 5.29253ZM33.1161 12.5827L32.3683 12.867V12.867L33.1161 12.5827ZM31.8692 33.5355L32.4349 34.1012L31.8692 33.5355ZM24.231 11.4836L25.0157 11.3276L24.231 11.4836ZM26.85 14.1026L26.694 14.8872L26.85 14.1026ZM11.667 20.8667C11.2252 20.8667 10.867 21.2248 10.867 21.6667C10.867 22.1085 11.2252 22.4667 11.667 22.4667V20.8667ZM25.0003 22.4667C25.4422 22.4667 25.8003 22.1085 25.8003 21.6667C25.8003 21.2248 25.4422 20.8667 25.0003 20.8667V22.4667ZM11.667 25.8667C11.2252 25.8667 10.867 26.2248 10.867 26.6667C10.867 27.1085 11.2252 27.4667 11.667 27.4667V25.8667ZM20.0003 27.4667C20.4422 27.4667 20.8003 27.1085 20.8003 26.6667C20.8003 26.2248 20.4422 25.8667 20.0003 25.8667V27.4667ZM23.3337 34.2H16.667V35.8H23.3337V34.2ZM7.46699 25V15H5.86699V25H7.46699ZM32.5337 15.0347V25H34.1337V15.0347H32.5337ZM16.667 5.8H23.6732V4.2H16.667V5.8ZM23.6732 5.8C25.2185 5.8 25.7493 5.81639 26.2079 6.02233L26.8633 4.56274C26.0191 4.18361 25.0759 4.2 23.6732 4.2V5.8ZM29.2539 6.70608C28.322 5.65771 27.7076 4.94187 26.8633 4.56274L26.2079 6.02233C26.6665 6.22826 27.0314 6.6141 28.058 7.76907L29.2539 6.70608ZM34.1337 15.0347C34.1337 13.8411 34.1458 13.0399 33.8638 12.2984L32.3683 12.867C32.5216 13.2702 32.5337 13.7221 32.5337 15.0347H34.1337ZM31.0518 11.1371C31.9238 12.1181 32.215 12.4639 32.3683 12.867L33.8638 12.2984C33.5819 11.5569 33.0406 10.9662 32.2476 10.0741L31.0518 11.1371ZM16.667 34.2C14.2874 34.2 12.5831 34.1983 11.2872 34.0241C10.0144 33.8529 9.25596 33.5287 8.69714 32.9698L7.56577 34.1012C8.47142 35.0069 9.62375 35.4148 11.074 35.6098C12.5013 35.8017 14.3326 35.8 16.667 35.8V34.2ZM5.86699 25C5.86699 27.3344 5.86529 29.1657 6.05718 30.593C6.25217 32.0432 6.66012 33.1956 7.56577 34.1012L8.69714 32.9698C8.13833 32.411 7.81405 31.6526 7.64292 30.3798C7.46869 29.0839 7.46699 27.3796 7.46699 25H5.86699ZM23.3337 35.8C25.6681 35.8 27.4993 35.8017 28.9266 35.6098C30.3769 35.4148 31.5292 35.0069 32.4349 34.1012L31.3035 32.9698C30.7447 33.5287 29.9863 33.8529 28.7134 34.0241C27.4175 34.1983 25.7133 34.2 23.3337 34.2V35.8ZM32.5337 25C32.5337 27.3796 32.532 29.0839 32.3577 30.3798C32.1866 31.6526 31.8623 32.411 31.3035 32.9698L32.4349 34.1012C33.3405 33.1956 33.7485 32.0432 33.9435 30.593C34.1354 29.1657 34.1337 27.3344 34.1337 25H32.5337ZM7.46699 15C7.46699 12.6204 7.46869 10.9161 7.64292 9.62024C7.81405 8.34738 8.13833 7.58897 8.69714 7.03015L7.56577 5.89878C6.66012 6.80443 6.25217 7.95676 6.05718 9.40704C5.86529 10.8343 5.86699 12.6656 5.86699 15H7.46699ZM16.667 4.2C14.3326 4.2 12.5013 4.1983 11.074 4.39019C9.62375 4.58518 8.47142 4.99313 7.56577 5.89878L8.69714 7.03015C9.25596 6.47133 10.0144 6.14706 11.2872 5.97592C12.5831 5.8017 14.2874 5.8 16.667 5.8V4.2ZM23.367 5V10H24.967V5H23.367ZM28.3337 14.9667H33.3337V13.3667H28.3337V14.9667ZM23.367 10C23.367 10.7361 23.3631 11.221 23.4464 11.6397L25.0157 11.3276C24.9709 11.1023 24.967 10.8128 24.967 10H23.367ZM28.3337 13.3667C27.5209 13.3667 27.2313 13.3628 27.0061 13.318L26.694 14.8872C27.1127 14.9705 27.5976 14.9667 28.3337 14.9667V13.3667ZM23.4464 11.6397C23.7726 13.2794 25.0543 14.5611 26.694 14.8872L27.0061 13.318C26.0011 13.1181 25.2156 12.3325 25.0157 11.3276L23.4464 11.6397ZM11.667 22.4667H25.0003V20.8667H11.667V22.4667ZM11.667 27.4667H20.0003V25.8667H11.667V27.4667ZM32.2476 10.0741L29.2539 6.70608L28.058 7.76907L31.0518 11.1371L32.2476 10.0741Z"
                          fill="#e63356"
                          id="icon"
                        />
                      </g>
                    </svg>
                    <h2 className="text-center text-gray-400 text-xs leading-4">
                      PNG, JPG or PDF, smaller than 15MB
                    </h2>
                  </div>
                  <div className="grid gap-2">
                    <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">
                      {getInputPropsIncomeProofDrag
                        ? "Drop the file here ..."
                        : "Drag and Drop your file here or"}
                    </h4>
                    <div className="flex items-center justify-center">
                      <div className="flex w-28 h-9 px-2 flex-col bg-primary-500 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
                        Choose File
                      </div>
                    </div>
                  </div>
                </div>
                {IncomeProofFile && (
                  <span className="text-xs text-gray-500 md:col-span-1 md:col-start-2">
                    {IncomeProofFile.name} (
                    {(IncomeProofFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                )}
              </div>
            </div>
          </div>

          {errors.uploadedDocuments && (
            <p className="text-xs text-primary-500">
              Some Required Documents are missing
            </p>
          )}
        </CardBody>
      </Card>
      <div className="flex justify-end">
        <Button
          className="bg-primary-500 hover:bg-rose-600 text-white"
          color="primary"
          type="submit"
        >
          Next: Review & Submit
        </Button>
      </div>
    </form>
  );
};

export default Section2;
