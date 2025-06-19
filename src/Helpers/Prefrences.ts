import { addToast } from "@heroui/toast";

import { GetUserInformation, UpdatePreferences } from "@/services/User";
import {
  AdditionalInformationFormSchemaType,
  ExperienceFormSchemaType,
  FinancialFormSchemaType,
  onbordingType,
  PersonalFormSchemaType,
  PreferencesFormSchemaType,
} from "@/types/Onbording";
import { User } from "@/types/User";

export const saveData = async (
  uid: string,
  PersonalFromData: PersonalFormSchemaType,
  FinancialFormData: FinancialFormSchemaType,
  ExperienceFormData: ExperienceFormSchemaType,
  PreferencesFormData: PreferencesFormSchemaType,
  AdditionalInformationFormData: AdditionalInformationFormSchemaType,
): Promise<void> => {
  try {
    const UserPreferences: onbordingType = {
      ...PersonalFromData,
      ...FinancialFormData,
      ...ExperienceFormData,
      ...PreferencesFormData,
      ...AdditionalInformationFormData,
    };

    UpdatePreferences(uid, UserPreferences).then(() => {
      return true;
    });
  } catch (error) {
    console.error("Error saving data: ", error);
    throw error;
  }
};

export const getUserPreferences = async (uid: string): Promise<any> => {
  try {
    let user: User;
    let preferencesObject = {};
    const response = await GetUserInformation(uid);

    user = response;
    const pref = user.userPreferences;

    if (!pref) return;

    preferencesObject = {
      financialData: {
        monthyIncome: pref.monthyIncome,
        monthlyExpense: pref.monthlyExpense,
        assets: pref.assets,
        liabilities: pref.liabilities,
        estimatedNetWorth: pref.estimatedNetWorth,
        primaryGoal: pref.primaryGoal,
        goalTimeFrame: pref.goalTimeFrame,
      },
      experienceData: {
        experienceLevel: pref.experienceLevel,
        previousInvestment: pref.previousInvestment,
        marketFluctuation: pref.marketFluctuation,
        riskPreference: pref.riskPreference,
      },
      preferencesData: {
        assetAllocation: pref.assetAllocation,
        sectorPreference: pref.sectorPreference,
        liquidityNeeds: pref.liquidityNeeds,
        taxConsideration: pref.taxConsideration,
      },
      additionalInformationData: {
        updateFrequency: pref.updateFrequency,
        notificationPreference: pref.notificationPreference,
        sectorsRestrictions: pref.sectorsRestrictions,
      },
    };

    return preferencesObject;
  } catch (error) {
    addToast({
      title: "Failed to retrive preferences",
      description: error as string,
      color: "danger",
      variant: "solid",
      timeout: 5000,
    });
    throw error;
  }
};
