import type React from "react";

import { useState } from "react";
import { Progress } from "@heroui/react";

import Section1 from "../../components/Deposit/Create/Section1";

import DefaultLayout from "@/layouts/default";
import Section3 from "@/components/Deposit/Create/Section3";
import Section2 from "@/components/Deposit/Create/Section2";
import FormSectionsSidebar from "@/components/Deposit/Create/FormSectionsSidebar";
import {
  Section1 as Section1Type,
  Section2 as Section2Type,
} from "@/types/Deposit";

export default function DepositFormPage() {
  const [formData, setFormData] = useState({
    // Deposit Details
    amount: 0,
    purpose: "",
    paymentMethod: "",
    scheduleDeposit: false,
    recurringInterval: "",
    endDate: undefined as Date | undefined,

    // Basic Information
    fullName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: undefined as Date | undefined,

    // Contact Information
    mobileNumber: "",

    // Residential Address
    address: "",
    city: "",
    state: "",
    pincode: "",

    // Professional & Financial Details
    occupation: "",
    annualIncome: "",
    sourceOfIncome: "",
    taxStatus: "",

    // Bank Account Details & ID
    bankName: "",
    ibanCode: "",
    bicId: "",
    personalId: "",

    // Nominee Details
    nomineeDetails: {
      name: "",
      relationship: "",
      dateOfBirth: undefined as Date | undefined,
    },

    uploadedDocuments: {
      personalId: null as File | null,
      addressProof: null as File | null,
      bankStatement: null as File | null,
      incomeProof: null as File | null,
    },
  });

  const [Section1Data, setSection1Data] = useState({} as Section1Type);
  const [Section2Data, setSection2Data] = useState({} as Section2Type);

  const [currentSection, setCurrentSection] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [formProgress, setFormProgress] = useState(0);

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
          <FormSectionsSidebar
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
          />

          <div className="lg:col-span-3 ">
            <div className="space-y-8">
              {/* Section 1*/}
              {currentSection === 1 && (
                <Section1
                  Section1Data={Section1Data}
                  setCurrentSection={setCurrentSection}
                  setSection1Data={setSection1Data}
                />
              )}

              {/* Section 2*/}
              {currentSection === 2 && (
                <Section2
                  Section2Data={Section2Data}
                  setCurrentSection={setCurrentSection}
                  setSection2Data={setSection2Data}
                />
              )}

              {/* Section 3*/}
              {currentSection === 3 && (
                <Section3
                  errors={errors}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  isProcessing={isProcessing}
                  setCurrentSection={setCurrentSection}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
}
