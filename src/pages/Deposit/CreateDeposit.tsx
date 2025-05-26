import type React from "react";

import { useCallback, useState } from "react";
import { format } from "date-fns";
import {
  Button,
  Calendar,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  cn,
  Divider,
  Input,
  Link,
  NumberInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDropzone } from "react-dropzone";

import DefaultLayout from "@/layouts/default";

export default function DepositFormPage() {
  const [formData, setFormData] = useState({
    // Deposit Details
    amount: 0,
    purpose: "",
    paymentMethod: "",
    scheduleDeposit: false,
    recurringInterval: "",
    endDate: undefined as Date | undefined,

    // Personal & Verification
    fullName: "",
    personalIdNumber: "",
    bankName: "",
    ibanCode: "",
    bicId: "",
    mobileNumber: "",
    dateOfBirth: undefined as Date | undefined,

    // Additional KYC & Investment Details
    fatherName: "",
    motherName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    occupation: "",
    annualIncome: "",
    sourceOfIncome: "",
    investmentExperience: "",
    riskTolerance: [3],
    investmentGoal: "",
    investmentHorizon: "",
    nomineeDetails: {
      name: "",
      relationship: "",
      dateOfBirth: undefined as Date | undefined,
    },

    // Financial Information
    existingInvestments: "",
    monthlyInvestmentCapacity: "",
    financialGoals: [] as string[],
    taxStatus: "",

    // Preferences & Settings
    communicationPreferences: [] as string[],
    statementFrequency: "",
    languagePreference: "",

    // Document Upload
    uploadedDocuments: {
      personalId: null as File | null,
      addressProof: null as File | null,
      bankStatement: null as File | null,
      incomeProof: null as File | null,
    },

    // Consent & Verification
    termsAccepted: false,
    riskAcknowledged: false,
    fatcaDeclaration: false,
    marketingConsent: false,
    otpCode: "",
  });

  const [currentSection, setCurrentSection] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [formProgress, setFormProgress] = useState(0);

  const [AddressProofFile, setAddressProofFile] = useState<File | undefined>();
  const [PersonalIdFile, setPersonalIdFile] = useState<File | undefined>();
  const [BankStatementFile, setBankStatementFile] = useState<
    File | undefined
  >();
  const [IncomeProofFile, setIncomeProofFile] = useState<File | undefined>();

  const onDropAddressProof = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];

      setAddressProofFile(file);
    },
    [setAddressProofFile, setFormData],
  );

  const onDropPersonalId = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];

      setPersonalIdFile(file);
      setFormData((prev) => ({
        ...prev,
        uploadedDocuments: { ...prev.uploadedDocuments, panCard: file },
      }));
    },
    [setPersonalIdFile, setFormData],
  );

  const onDropBankStatement = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];

      setBankStatementFile(file);
      setFormData((prev) => ({
        ...prev,
        uploadedDocuments: { ...prev.uploadedDocuments, bankStatement: file },
      }));
    },
    [setBankStatementFile, setFormData],
  );

  const onDropIncomeProof = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];

      setIncomeProofFile(file);
      setFormData((prev) => ({
        ...prev,
        uploadedDocuments: { ...prev.uploadedDocuments, incomeProof: file },
      }));
    },
    [setIncomeProofFile, setFormData],
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

  // Calculate form completion progress
  const calculateProgress = () => {
    const totalFields = 25;
    const filledFields = Object.values(formData).filter((value) => {
      if (typeof value === "string") return value.trim() !== "";
      if (typeof value === "boolean") return value;
      if (Array.isArray(value)) return value.length > 0;

      return value !== null && value !== undefined;
    }).length;

    return Math.min((filledFields / totalFields) * 100, 100);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormProgress(calculateProgress());

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleNestedInputChange = (
    parent: string,
    field: string,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof typeof prev] as any),
        [field]: value,
      },
    }));
  };

  const handleAmountChange = (value: number) => {
    handleInputChange("amount", value);
  };

  const handleFileUpload = (documentType: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      uploadedDocuments: {
        ...prev.uploadedDocuments,
        [documentType]: file,
      },
    }));
  };

  const sendOTP = () => {
    if (formData.mobileNumber) {
      setOtpSent(true);
      setTimeout(() => {
        alert("OTP sent to " + formData.mobileNumber);
      }, 500);
    }
  };

  const validateSection = (section: number) => {
    const newErrors: Record<string, string> = {};

    if (section === 1) {
      if (!formData.amount || formData.amount < 100) {
        newErrors.amount = "Minimum deposit amount is €100";
      }
      if (formData.amount > 1000000) {
        newErrors.amount = "Maximum deposit amount is €10,00,000";
      }
      if (!formData.paymentMethod) {
        newErrors.paymentMethod = "Please select a payment method";
      }
      if (formData.scheduleDeposit && !formData.recurringInterval) {
        newErrors.recurringInterval = "Please select recurring interval";
      }
    }

    if (section === 2) {
      if (!formData.fullName.trim())
        newErrors.fullName = "Full name is required";
      if (!formData.personalIdNumber.trim())
        newErrors.panNumber = "Personal ID Number is required";
      if (!formData.mobileNumber.trim())
        newErrors.mobileNumber = "Mobile number is required";
      if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
        newErrors.mobileNumber = "Please enter a valid mobile number";
      }
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.personalIdNumber)) {
        newErrors.panNumber = "Please enter a valid PAN number";
      }
    }

    if (section === 3) {
      if (!formData.termsAccepted)
        newErrors.termsAccepted = "Please accept terms and conditions";
      if (!formData.riskAcknowledged)
        newErrors.riskAcknowledged = "Please acknowledge investment risks";
      if (!formData.fatcaDeclaration)
        newErrors.fatcaDeclaration = "FATCA declaration is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSection(3)) return;

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      alert("Deposit request submitted successfully!");
    }, 2000);
  };

  return (
    <DefaultLayout fullWidth>
      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add Funds to Your Account
          </h1>
          <p className="text-gray-600">
            Complete the form below to deposit funds and start investing
          </p>

          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Form Completion</span>
              <span>{Math.round(formProgress)}%</span>
            </div>
            <Progress className="h-2" value={formProgress} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-24 p-2">
              <CardHeader>
                <h3 className="text-lg font-semibold">Form Sections</h3>
              </CardHeader>
              <CardBody className="space-y-2">
                <button
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentSection === 1
                      ? "bg-rose-50 text-primary-500 border border-rose-200"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setCurrentSection(1)}
                >
                  <div className="font-medium">1. Deposit Details</div>
                  <div className="text-sm text-gray-500">
                    Amount & payment method
                  </div>
                </button>
                <button
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentSection === 2
                      ? "bg-rose-50 text-primary-500 border border-rose-200"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setCurrentSection(2)}
                >
                  <div className="font-medium">2. Personal Information</div>
                  <div className="text-sm text-gray-500">
                    KYC & verification details
                  </div>
                </button>
                <button
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentSection === 3
                      ? "bg-rose-50 text-primary-500 border border-rose-200"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setCurrentSection(3)}
                >
                  <div className="font-medium">3. Confirmation</div>
                  <div className="text-sm text-gray-500">Review & submit</div>
                </button>
              </CardBody>
            </Card>
          </div>

          <div className="lg:col-span-3 ">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Section 1*/}
              {currentSection === 1 && (
                <div className="space-y-6">
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
                        <NumberInput
                          hideStepper
                          className="text-right rounded-none"
                          formatOptions={{
                            style: "currency",
                            currency: "EUR",
                          }}
                          id="amount"
                          label="Deposit Amount *"
                          labelPlacement="outside"
                          maxValue={1000000}
                          minValue={1000}
                          placeholder="Enter amount"
                          type="text"
                          value={formData.amount}
                          variant="flat"
                          onValueChange={handleAmountChange}
                        />

                        {errors.amount && (
                          <p className="text-sm text-red-500">
                            {errors.amount}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          Minimum: €1000 | Maximum: €10,00,000
                        </p>
                      </div>
                      {/* Quick Amount Buttons */}
                      <div className="grid grid-cols-4 gap-2">
                        {[1000, 5000, 10000, 25000].map((amount) => (
                          <Button
                            key={amount}
                            className="text-xs"
                            size="sm"
                            type="button"
                            variant="bordered"
                            onPress={() =>
                              handleInputChange("amount", amount.toString())
                            }
                          >
                            €{amount.toLocaleString()}
                          </Button>
                        ))}
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="purpose">
                          Deposit Purpose (Optional)
                        </label>
                        <Select
                          className="w-full"
                          placeholder="Select purpose"
                          selectedKeys={formData.purpose}
                          variant="flat"
                          onSelectionChange={(keys) =>
                            handleInputChange("purpose", Array.from(keys)[0])
                          }
                        >
                          <SelectItem key="investing">Investing</SelectItem>
                          <SelectItem key="advisory">
                            Advisory Access
                          </SelectItem>
                          <SelectItem key="learning">Learning</SelectItem>
                          <SelectItem key="goal">Save for Goal</SelectItem>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <p>Payment Method *</p>
                        <RadioGroup
                          value={formData.paymentMethod}
                          onValueChange={(value) =>
                            handleInputChange("paymentMethod", value)
                          }
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
                                  <div className="text-xs text-gray-500">
                                    Bank transfer
                                  </div>
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
                                  <div className="font-medium">
                                    Digital Wallet
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Quick & easy
                                  </div>
                                </div>
                              </label>
                            </div>
                          </div>
                        </RadioGroup>
                        {errors.paymentMethod && (
                          <p className="text-sm text-red-500">
                            {errors.paymentMethod}
                          </p>
                        )}
                      </div>

                      <div className="grid gap-4 pb-4">
                        <div className="flex items-center justify-between">
                          <label htmlFor="schedule">
                            Schedule Recurring Deposit?
                          </label>
                          <Switch
                            id="schedule"
                            isSelected={formData.scheduleDeposit} // HeroUI uses isSelected
                            onValueChange={(checked) =>
                              handleInputChange("scheduleDeposit", checked)
                            }
                          />
                        </div>

                        {formData.scheduleDeposit && (
                          <div className="grid gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="grid gap-2">
                              <label htmlFor="interval">
                                Recurring Interval *
                              </label>
                              <Select
                                className="w-full"
                                placeholder="Select interval"
                                selectedKey={formData.recurringInterval}
                                variant="flat"
                                onSelectionChange={(keys) =>
                                  handleInputChange(
                                    "recurringInterval",
                                    Array.from(keys)[0],
                                  )
                                }
                              >
                                <SelectItem key="daily">Daily</SelectItem>
                                <SelectItem key="weekly">Weekly</SelectItem>
                                <SelectItem key="monthly">Monthly</SelectItem>
                              </Select>
                              {errors.recurringInterval && (
                                <p className="text-sm text-red-500">
                                  {errors.recurringInterval}
                                </p>
                              )}
                            </div>

                            <div className="grid gap-2">
                              <p>End Date (Optional)</p>
                              {/* HeroUI Popover components are often built differently. 
                                   You might need to adjust based on their specific API.
                                   The Calendar component might also be different.*/}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    // variant="outline" // Map to HeroUI variant
                                    className={cn(
                                      "justify-start text-left font-normal",
                                      !formData.endDate &&
                                        "text-muted-foreground",
                                    )}
                                    variant="bordered"
                                  >
                                    {formData.endDate
                                      ? format(formData.endDate, "PPP")
                                      : "Select end date"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  {/* HeroUI Calendar component would likely have a different API */}
                                  <Calendar
                                    value={formData.endDate} // HeroUI might use value for date picker
                                    onChange={(date) =>
                                      handleInputChange("endDate", date)
                                    }
                                    // initialFocus // Check HeroUI Calendar props
                                  />
                                </PopoverContent>
                              </Popover>
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
                      type="button"
                      onPress={() => {
                        if (validateSection(1)) setCurrentSection(2);
                      }}
                    >
                      Next: Personal Information
                    </Button>
                  </div>
                </div>
              )}

              {/* Section 2*/}
              {currentSection === 2 && (
                <div className="space-y-6">
                  <Card className="p-4">
                    <CardHeader>
                      <h2 className="flex items-center gap-2 text-xl font-semibold">
                        <div className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          2
                        </div>
                        Personal Information & KYC Details
                      </h2>
                    </CardHeader>
                    <CardBody className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg flex items-center gap-2">
                          <Icon
                            className="text-blue-500"
                            height="24"
                            icon="material-symbols:shield-outline-rounded"
                            width="24"
                          />
                          Basic Information
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <label htmlFor="fullName">
                              Full Name (as per bank) *
                            </label>
                            <Input
                              id="fullName"
                              placeholder="Enter full name"
                              value={formData.fullName}
                              variant="flat"
                              onChange={(e) =>
                                handleInputChange("fullName", e.target.value)
                              }
                            />
                            {errors.fullName && (
                              <p className="text-sm text-red-500">
                                {errors.fullName}
                              </p>
                            )}
                          </div>

                          <div className="grid gap-2">
                            <label htmlFor="dob">Date of Birth *</label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  className={cn(
                                    "justify-start text-left font-normal ",
                                    !formData.dateOfBirth && "text-gray-500",
                                  )}
                                  variant="flat"
                                >
                                  {formData.dateOfBirth
                                    ? format(formData.dateOfBirth, "PPP")
                                    : "Select date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  //@ts-ignore
                                  value={formData.dateOfBirth}
                                  onChange={(date) =>
                                    handleInputChange("dateOfBirth", date)
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="grid gap-2">
                            <label htmlFor="fatherName">
                              Father&apos;s Name
                            </label>
                            <Input
                              id="fatherName"
                              placeholder="Enter father's name"
                              value={formData.fatherName}
                              variant="flat"
                              onChange={(e) =>
                                handleInputChange("fatherName", e.target.value)
                              }
                            />
                          </div>

                          <div className="grid gap-2">
                            <label htmlFor="motherName">
                              Mother&apos;s Name
                            </label>
                            <Input
                              id="motherName"
                              placeholder="Enter mother's name"
                              value={formData.motherName}
                              variant="flat"
                              onChange={(e) =>
                                handleInputChange("motherName", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <Divider />
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg">
                          Contact Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <label htmlFor="mobileNumber">
                              Mobile Number *
                            </label>
                            <Input
                              id="mobileNumber"
                              maxLength={8}
                              placeholder="e.g., 98841216"
                              type="tel"
                              value={formData.mobileNumber}
                              variant="flat"
                              onChange={(e) =>
                                handleInputChange(
                                  "mobileNumber",
                                  e.target.value,
                                )
                              }
                            />
                            {errors.mobileNumber && (
                              <p className="text-sm text-red-500">
                                {errors.mobileNumber}
                              </p>
                            )}
                            <Button
                              color="secondary"
                              disabled={
                                otpSent || formData.mobileNumber.length !== 10
                              }
                              size="sm"
                              type="button"
                              onPress={sendOTP}
                            >
                              {otpSent
                                ? "Confirmation Sent!"
                                : "Send Confirmation"}
                            </Button>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="otpCode">OTP Code</label>
                            <Input
                              disabled={!otpSent}
                              id="otpCode"
                              maxLength={6}
                              placeholder="Enter OTP"
                              type="text"
                              value={formData.otpCode}
                              variant="flat"
                              onChange={(e) =>
                                handleInputChange("otpCode", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <Divider />
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg">
                          Residential Address
                        </h3>
                        <div className="grid gap-2">
                          <label htmlFor="address">Address Line</label>
                          <Textarea
                            id="address"
                            placeholder="Street, Building, Apartment"
                            value={formData.address}
                            variant="flat"
                            onChange={(e) =>
                              handleInputChange("address", e.target.value)
                            }
                          />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="grid gap-2">
                            <label htmlFor="city">City</label>
                            <Input
                              id="city"
                              placeholder="City"
                              value={formData.city}
                              variant="flat"
                              onChange={(e) =>
                                handleInputChange("city", e.target.value)
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <label htmlFor="state">State</label>
                            <Input
                              id="state"
                              placeholder="State"
                              value={formData.state}
                              variant="flat"
                              onChange={(e) =>
                                handleInputChange("state", e.target.value)
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <label htmlFor="pincode">Pincode</label>
                            <Input
                              id="pincode"
                              maxLength={6}
                              placeholder="Pincode"
                              value={formData.pincode}
                              variant="flat"
                              onChange={(e) =>
                                handleInputChange("pincode", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <Divider />
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg">
                          Professional & Financial Details
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <label htmlFor="occupation">Occupation</label>
                            <Input
                              id="occupation"
                              placeholder="Your occupation"
                              value={formData.occupation}
                              variant="flat"
                              onChange={(e) =>
                                handleInputChange("occupation", e.target.value)
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <label htmlFor="annualIncome">Annual Income</label>
                            <Select
                              className="w-full"
                              placeholder="Select income range"
                              selectedKeys={formData.annualIncome}
                              variant="flat"
                              onSelectionChange={(keys) =>
                                handleInputChange(
                                  "annualIncome",
                                  Array.from(keys)[0],
                                )
                              }
                            >
                              <SelectItem key="0-25k">
                                {"<"} €25,000 Euros
                              </SelectItem>
                              <SelectItem key="25k-40k">
                                €25,000 - €40,000 Euros
                              </SelectItem>
                              <SelectItem key="40k-60k">
                                €40,000 - €60,000 Euros
                              </SelectItem>
                              <SelectItem key="60k-80k">
                                €60,000 - €80,000 Euros
                              </SelectItem>
                              <SelectItem key="80k-120k">
                                €80,000 - €120,000 Euros
                              </SelectItem>
                              <SelectItem key="120k+">
                                {">"} €120,000 Euros
                              </SelectItem>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <label htmlFor="sourceOfIncome">
                              Source of Income
                            </label>
                            <Input
                              id="sourceOfIncome"
                              placeholder="e.g., Salary, Business"
                              value={formData.sourceOfIncome}
                              variant="flat"
                              onChange={(e) =>
                                handleInputChange(
                                  "sourceOfIncome",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <label htmlFor="taxStatus">Tax Status</label>
                            <Select
                              className="w-full"
                              placeholder="Select tax status"
                              selectedKeys={formData.taxStatus}
                              variant="flat"
                              onSelectionChange={(keys) =>
                                handleInputChange(
                                  "taxStatus",
                                  Array.from(keys)[0],
                                )
                              }
                            >
                              <SelectItem key="resident">
                                Resident Individual
                              </SelectItem>
                              <SelectItem key="nri">NRI</SelectItem>
                              <SelectItem key="huf">HUF</SelectItem>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <Divider />
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg">
                          Bank Account Details
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Icon
                            className="text-warning-600"
                            height="24"
                            icon="mynaui:danger-hexagon"
                            width="24"
                          />
                          Ensure these details match your identification for
                          successful transactions.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <label htmlFor="bankName">Bank name</label>
                            <Input
                              id="bankName"
                              placeholder="Bank Name"
                              value={formData.bankName}
                              variant="flat"
                              onChange={(e) =>
                                handleInputChange("bankName", e.target.value)
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <label htmlFor="ibanCode">IBAN Code</label>
                            <Input
                              id="ibanCode"
                              maxLength={11}
                              placeholder="e.g., GB88MIDL0700..."
                              value={formData.ibanCode}
                              variant="flat"
                              onChange={(e) =>
                                handleInputChange("ibanCode", e.target.value)
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <label htmlFor="bicId">BIC ID</label>
                            <Input
                              id="bicId"
                              placeholder="e.g., DABADEMMXXX"
                              value={formData.bicId}
                              variant="flat"
                              onChange={(e) =>
                                handleInputChange("bicId", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <Divider />
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg">
                          Nominee Details (Optional)
                        </h3>
                        <p className="text-sm text-gray-600">
                          Adding a nominee ensures your investments are secure.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <label htmlFor="nomineeName">
                              Nominee&apos;s Full Name
                            </label>
                            <Input
                              id="nomineeName"
                              placeholder="Enter nominee's full name"
                              value={formData.nomineeDetails.name}
                              variant="flat"
                              onChange={(e) =>
                                handleNestedInputChange(
                                  "nomineeDetails",
                                  "name",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <label htmlFor="nomineeRelationship">
                              Relationship
                            </label>
                            <Input
                              id="nomineeRelationship"
                              placeholder="e.g., Mother, Spouse"
                              value={formData.nomineeDetails.relationship}
                              variant="flat"
                              onChange={(e) =>
                                handleNestedInputChange(
                                  "nomineeDetails",
                                  "relationship",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div className="grid gap-2 md:col-span-2">
                            <label htmlFor="nomineeDob">
                              Nominee&apos;s Date of Birth
                            </label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  className={cn(
                                    "justify-start text-left font-normal",
                                    !formData.nomineeDetails.dateOfBirth &&
                                      "text-gray-500",
                                  )}
                                  variant="flat"
                                >
                                  {formData.nomineeDetails.dateOfBirth
                                    ? format(
                                        formData.nomineeDetails.dateOfBirth,
                                        "PPP",
                                      )
                                    : "Select date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  //@ts-ignore
                                  value={formData.nomineeDetails.dateOfBirth}
                                  onChange={(date) =>
                                    handleNestedInputChange(
                                      "nomineeDetails",
                                      "dateOfBirth",
                                      date,
                                    )
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </div>

                      <Divider />
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg">
                          Document Upload (Optional)
                        </h3>
                        <p className="text-sm text-gray-600">
                          Upload documents for faster verification.
                        </p>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <div className="flex flex-col">
                            <p className="mb-2">
                              Personal ID (Passport/National ID)
                            </p>
                            <div
                              {...getRootPropsPersonalId()}
                              className={`w-full py-9 bg-gray-100 hover:bg-gray-200 rounded-2xl border border-gray-300 gap-3 grid border-dashed cursor-pointer ${
                                getInputPropsPersonalIdDrag ? "bg-gray-200" : ""
                              }`}
                            >
                              <input {...getInputPropsPersonalId()} />
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
                                {(PersonalIdFile.size / 1024 / 1024).toFixed(2)}{" "}
                                MB)
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
                              <input {...getInputPropsAddressProof()} />
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
                                {(AddressProofFile.size / 1024 / 1024).toFixed(
                                  2,
                                )}{" "}
                                MB)
                              </span>
                            )}
                          </div>

                          <div className="flex flex-col">
                            <p className="mb-2">Bank Statement</p>
                            <div
                              {...getRootPropsBankStatement()}
                              className={`w-full py-9 bg-gray-100 hover:bg-gray-200 rounded-2xl border border-gray-300 gap-3 grid border-dashed cursor-pointer ${
                                getInputPropsBankStatementDrag
                                  ? "bg-gray-200"
                                  : ""
                              }`}
                            >
                              <input {...getInputPropsBankStatement()} />
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
                                {(BankStatementFile.size / 1024 / 1024).toFixed(
                                  2,
                                )}{" "}
                                MB)
                              </span>
                            )}
                          </div>

                          <div className="flex flex-col">
                            <p className="mb-2">Income Proof</p>
                            <div
                              {...getRootPropsIncomeProof()}
                              className={`w-full py-9 bg-gray-100 hover:bg-gray-200 rounded-2xl border border-gray-300 gap-3 grid border-dashed cursor-pointer ${
                                getInputPropsIncomeProofDrag
                                  ? "bg-gray-200"
                                  : ""
                              }`}
                            >
                              <input {...getInputPropsIncomeProof()} />
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
                                {(IncomeProofFile.size / 1024 / 1024).toFixed(
                                  2,
                                )}{" "}
                                MB)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="bordered"
                      onPress={() => setCurrentSection(1)}
                    >
                      <Icon
                        className="-rotate-90"
                        height="24"
                        icon="basil:arrow-up-outline"
                        width="24"
                      />
                      Previous: Deposit Details
                    </Button>
                    <Button
                      color="primary"
                      type="button"
                      onPress={() => {
                        if (validateSection(2)) setCurrentSection(3);
                      }}
                    >
                      Next: Confirmation
                    </Button>
                  </div>
                </div>
              )}

              {/* Section 3*/}
              {currentSection === 3 && (
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
                        <h3 className="font-medium text-lg">
                          Summary of Your Deposit
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <div className="font-medium text-gray-500">
                              Deposit Amount:
                            </div>
                            <div className="font-bold">€{formData.amount}</div>
                          </div>

                          <div className="flex justify-between">
                            <div className="font-medium text-gray-500">
                              Payment Method:
                            </div>
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
                            <div className="font-medium text-gray-500">
                              Full Name:
                            </div>
                            <div className="font-bold">{formData.fullName}</div>
                          </div>

                          <div className="flex justify-between">
                            <div className="font-medium text-gray-500">
                              Personal ID Number:
                            </div>
                            <div className="font-bold">
                              {formData.personalIdNumber}
                            </div>
                          </div>

                          <div className="flex justify-between">
                            <div className="font-medium text-gray-500">
                              Mobile Number:
                            </div>
                            <div className="font-bold">
                              {formData.mobileNumber}
                            </div>
                          </div>

                          <div className="flex justify-between">
                            <div className="font-medium text-gray-500">
                              Address:
                            </div>
                            <div className="font-bold">
                              {formData.address || "N/A"}
                            </div>
                          </div>

                          <div className="flex justify-between">
                            <div className="font-medium text-gray-500">
                              Risk Tolerance:
                            </div>
                            <div className="font-bold">
                              {formData.riskTolerance[0] === 1
                                ? "Very Conservative"
                                : formData.riskTolerance[0] === 2
                                  ? "Conservative"
                                  : formData.riskTolerance[0] === 3
                                    ? "Moderate"
                                    : formData.riskTolerance[0] === 4
                                      ? "Aggressive"
                                      : "Very Aggressive"}
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
                          <p className="text-md font-bold">
                            Investment Risk Disclosure
                          </p>
                        </div>
                        <p className="text-sm p-2 ms-5">
                          Mutual fund investments are subject to market risks.
                          Past performance is not indicative of future results.
                          Please read all scheme related documents carefully
                          before investing. The NAV of the scheme may go up or
                          down depending upon the factors and forces affecting
                          securities market.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium text-lg">
                          Consent & Declarations *
                        </h3>
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
                              <Link
                                className="text-rose-500 underline"
                                href="#"
                              >
                                Terms and Conditions
                              </Link>{" "}
                              and Privacy Policy.
                            </label>
                          </div>
                          {errors.termsAccepted && (
                            <p className="text-sm text-red-500">
                              {errors.termsAccepted}
                            </p>
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
                              I acknowledge and understand the investment risks
                              associated with this deposit.
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
                              I confirm I am not a U.S. person and make FATCA
                              declaration.
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
                              I consent to receive marketing communications and
                              offers. (Optional)
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
                    <Button
                      color="primary"
                      disabled={isProcessing}
                      type="submit"
                    >
                      {isProcessing ? "Processing..." : "Confirm & Deposit"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
}
