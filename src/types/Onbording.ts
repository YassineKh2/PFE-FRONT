import { z } from "zod";

import {
  AdditionalInformationFormSchema,
  ExperienceFormSchema,
  FinancialFormSchema,
  onbordingSchema,
  PersonalFormSchema,
  PreferencesFormSchema,
} from "@/schemas/onbordingSchema";

export type PersonalFormSchemaType = z.infer<typeof PersonalFormSchema>;

export type FinancialFormSchemaType = z.infer<typeof FinancialFormSchema>;

export type ExperienceFormSchemaType = z.infer<typeof ExperienceFormSchema>;

export type PreferencesFormSchemaType = z.infer<typeof PreferencesFormSchema>;

export type AdditionalInformationFormSchemaType = z.infer<
  typeof AdditionalInformationFormSchema
>;

export type onbordingType = z.infer<typeof onbordingSchema>;
