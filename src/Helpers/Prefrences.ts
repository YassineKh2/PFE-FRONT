import { app } from "@/firebase/firebase";
import {
  AdditionalInformationFormSchemaType,
  ExperienceFormSchemaType,
  FinancialFormSchemaType,
  PersonalFormSchemaType,
  PreferencesFormSchemaType,
} from "@/types/Onbording";
import { addToast } from "@heroui/toast";
import { collection, addDoc, initializeFirestore } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export const saveData = async (
  uid: string,
  PersonalFromData: PersonalFormSchemaType,
  FinancialFormData: FinancialFormSchemaType,
  ExperienceFormData: ExperienceFormSchemaType,
  PreferencesFormData: PreferencesFormSchemaType,
  AdditionalInformationFormData: AdditionalInformationFormSchemaType
): Promise<void> => {
  try {
    const preferencesCollection = collection(db, "preferences");
    await addDoc(preferencesCollection, {
      personalData: PersonalFromData,
      financialData: FinancialFormData,
      experienceData: ExperienceFormData,
      preferencesData: PreferencesFormData,
      additionalInformationData: AdditionalInformationFormData,
      userid: uid,
      createdAt: new Date(),
    });
    console.log("Data saved successfully!");
  } catch (error) {
    console.error("Error saving data: ", error);
    throw error;
  }
};

export const getUserPreferences = async (uid: string): Promise<any> => {
  try {
    const preferencesCollection = collection(db, "preferences");
    const q = query(preferencesCollection, where("userid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No preferences found for the user.");
      return null;
    }

    const preferences = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return preferences;
  } catch (error) {
    addToast({
      title: "Failed to retrive preferences",
      description: error as string,
      color: "danger",
      variant: "solid",
      timeout: 5000,
    })
    throw error;
  }
};
