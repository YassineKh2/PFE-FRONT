import { z } from "zod";

export const onbordingSchema = z.object({
  // Personal & Contact
  fullName: z.string().min(1, "Full Name is required"),
  dateOfBirth: z.string().min(1, "Invalid date of birth"),
  phoneNumber: z.string().min(8, "Invalid phone number"),
  // Financial Situation
  monthyIncome: z.string().min(1, "Invalid monthly income"),
  monthlyExpense: z.string().min(1, "Invalid monthly expense"),
  assets: z.string().min(1, "Invalid assets"),
  liabilities: z.string().min(1, "Invalid liabilities"),
  estimatedNetWorth: z.string().min(1, "Invalid estimated net worth"),
  primaryGoal: z.string().min(1, "Primary goal is required"),
  goalTimeFrame: z.string().min(1, "Goal time frame is required"),
  // Experience & Knowledge
  experienceLevel: z.string().min(1, "Experience level is required"),
  previousInvestment: z.boolean(),
  marketFluctuation: z.string().min(1, "Market fluctuation is required"),
  riskPreference: z.string().min(1, "Risk tolerance is required"),
  // Preferences
  assetAllocation: z.array(z.string()).min(1, "Asset allocation is required"),
  sectorPreference: z.array(z.string()).min(1, "Sector preference is required"),
  liquidityNeeds: z.string().min(1, "Liquidity needs is required"),
  taxConsideration: z.string().min(1, "Tax consideration is required"),
  // Additional Information
  updateFrequency: z.string().min(1, "Update frequency is required"),
  notificationPreference: z.array(z.string()),
  sectorsRestrictions: z
    .array(z.string())
    .min(1, "Sector restrictions is required"),
});

export const PersonalFormSchema = onbordingSchema.pick({
  fullName: true,
  dateOfBirth: true,
  phoneNumber: true,
});

export const FinancialFormSchema = onbordingSchema.pick({
  monthyIncome: true,
  monthlyExpense: true,
  assets: true,
  liabilities: true,
  estimatedNetWorth: true,
  primaryGoal: true,
  goalTimeFrame: true,
});

export const ExperienceFormSchema = onbordingSchema.pick({
  experienceLevel: true,
  previousInvestment: true,
  marketFluctuation: true,
  riskPreference: true,
});
export const PreferencesFormSchema = onbordingSchema.pick({
  assetAllocation: true,
  sectorPreference: true,
  liquidityNeeds: true,
  taxConsideration: true,
});

export const AdditionalInformationFormSchema = onbordingSchema.pick({
  updateFrequency: true,
  notificationPreference: true,
  sectorsRestrictions: true,
});
