import { z } from "zod";

const today = new Date();
const eighteenYearsAgo = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate(),
);

export const DepositSchema = z.object({
  // Deposit Details
  amount: z.string().min(4, "Deposit amount is r"),
  purpose: z.string().optional(),
  paymentMethod: z.string().min(1, "Payment method is required"),
  scheduleDeposit: z.boolean().optional(),
  recurringInterval: z.string().optional(),
  endDate: z.date().optional().optional(),

  // Basic Information
  fullName: z.string().min(2, "Deposit amount is required"),
  fatherName: z.string().min(1, "Father Name is required"),
  motherName: z.string().min(1, "Mother Name is required"),
  dateOfBirth: z.date().max(eighteenYearsAgo, {
    message: "You must be at least 18 years old",
  }),

  // Contact Information
  mobileNumber: z.string().min(1, "Mobile Number is required"),

  // Residential Address
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "state is required"),
  pincode: z.string().min(1, "pincode is required"),

  // Professional & Financial Details
  occupation: z.string().min(1, "occupation  is required"),
  annualIncome: z.string().min(1, "annualIncome  is required"),
  sourceOfIncome: z.string().min(1, "sourceOfIncome is required"),
  taxStatus: z.string().min(1, "taxStatus is required"),

  // Bank Account Details & ID
  bankName: z.string().min(1, "bankName is required"),
  ibanCode: z.string().min(1, "ibanCodeis required"),
  bicId: z.string().min(1, "bicId is required"),
  personalId: z.string().min(1, "personalId is required"),

  // Nominee Details
  nomineeDetails: z
    .object({
      name: z.string().optional(),
      relationship: z.string().optional(),
      dateOfBirth: z.date().optional(),
    })
    .optional(),

  uploadedDocuments: z.object({
    personalId: z.string().min(1, "Personal Id Document is required"),
    addressProof: z.string().min(1, "Address Proof Document  is required"),
    bankStatement: z.string().min(1, "Bank Statement Document  is required"),
    incomeProof: z.string().min(1, "Income Proof Document  is required"),
  }),

  status: z.string().optional(),
});

export const DepositDetailsSchema = DepositSchema.pick({
  amount: true,
  purpose: true,
  paymentMethod: true,
  scheduleDeposit: true,
  recurringInterval: true,
  endDate: true,
});

export const DepositOtherDetailsSchema = DepositSchema.pick({
  fullName: true,
  fatherName: true,
  motherName: true,
  dateOfBirth: true,
  mobileNumber: true,
  address: true,
  city: true,
  state: true,
  pincode: true,
  occupation: true,
  annualIncome: true,
  sourceOfIncome: true,
  taxStatus: true,
  bankName: true,
  ibanCode: true,
  bicId: true,
  personalId: true,
  nomineeDetails: true,
  uploadedDocuments: true,
});
