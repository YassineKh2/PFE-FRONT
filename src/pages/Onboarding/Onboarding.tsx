import { addToast } from "@heroui/toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import AdditionalInformationForm from "@/components/Onboarding/AdditionalInformationForm";
import ExperienceForm from "@/components/Onboarding/ExperienceForm";
import FinancialForm from "@/components/Onboarding/FinancialForm";
import PersonalForm from "@/components/Onboarding/PersonalForm";
import PreferencesFrom from "@/components/Onboarding/PreferencesFrom";
import RowSteps from "@/components/Onboarding/RowStepper";
import DefaultLayout from "@/layouts/default";
import { useAuth } from "@/providers/AuthProvider";
import { onbordingSchema } from "@/schemas/onbordingSchema";
import {
  AdditionalInformationFormSchemaType,
  ExperienceFormSchemaType,
  FinancialFormSchemaType,
  PersonalFormSchemaType,
  PreferencesFormSchemaType,
} from "@/types/Onbording";
import { saveData } from "@/Helpers/Prefrences";

export default function Onboarding() {
  const [Step, setStep] = useState(0);
  const { userLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Personal Form Data
  const [isPersonalFormValid, setIsPersonalFormValid] = useState(false);
  const [PersonalFromData, setPersonalFormData] =
    useState<PersonalFormSchemaType>({} as PersonalFormSchemaType);

  // Financial Form Data
  const [isFinancialFormValid, setIsFinancialFormValid] = useState(false);
  const [FinancialFormData, setFinancialFormData] =
    useState<FinancialFormSchemaType>({} as FinancialFormSchemaType);

  // Experience Form Data
  const [isExperienceFormValid, setIsExperienceFormValid] = useState(false);
  const [ExperienceFormData, setExperienceFormData] =
    useState<ExperienceFormSchemaType>({} as ExperienceFormSchemaType);

  // Preferences Form Data
  const [isPreferencesFormValid, setIsPreferencesFormValid] = useState(false);
  const [PreferencesFormData, setPreferencesFormData] =
    useState<PreferencesFormSchemaType>({} as PreferencesFormSchemaType);

  // Additional Information Form Data
  const [
    isAdditionalInformationFormValid,
    setIsAdditionalInformationFormValid,
  ] = useState(false);
  const [AdditionalInformationFormData, setAdditionalInformationFormData] =
    useState<AdditionalInformationFormSchemaType>(
      {} as AdditionalInformationFormSchemaType
    );

  const handleStepChange = (newStep: number) => {
    if (newStep > Step) {
      switch (Step) {
        case 0:
          if (!isPersonalFormValid) return;
          break;
        case 1:
          if (!isFinancialFormValid) return;
          break;
        case 2:
          if (!isExperienceFormValid) return;
          break;
        case 3:
          if (!isPreferencesFormValid) return;
          break;
        case 4:
          if (!isAdditionalInformationFormValid) return;
          break;
      }
    }
    setStep(newStep);
  };

  useEffect(() => {
    if (isAdditionalInformationFormValid) {
      const allFormData = {
        ...PersonalFromData,
        ...FinancialFormData,
        ...ExperienceFormData,
        ...PreferencesFormData,
        ...AdditionalInformationFormData,
      };

      const isAllFormDataValid = onbordingSchema.safeParse(allFormData);

      if (!isAllFormDataValid.success) {
        addToast({
          title: "Error !",
          description: "Verify your infomation ",
          color: "danger",
        });

        return;
      }

      if (userLoggedIn) {
        saveData(
          currentUser.uid,
          PersonalFromData,
          FinancialFormData,
          ExperienceFormData,
          PreferencesFormData,
          AdditionalInformationFormData
        ).then(() => {
          addToast({
            title: "Success !",
            description: "Your information has been saved successfully.",
            color: "success",
          });
        });
        navigate("/recommended");
      } else {
        localStorage.setItem("personalData", JSON.stringify(PersonalFromData));
        localStorage.setItem(
          "financialData",
          JSON.stringify(FinancialFormData)
        );
        localStorage.setItem(
          "experienceData",
          JSON.stringify(ExperienceFormData)
        );
        localStorage.setItem(
          "preferencesData",
          JSON.stringify(PreferencesFormData)
        );
        localStorage.setItem(
          "additionalInformationData",
          JSON.stringify(AdditionalInformationFormData)
        );
        onOpen();
      }

      return;
    }
  }, [isAdditionalInformationFormValid]);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="self-start">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete your recommendations form
          </h1>
          <p className="text-gray-600">
            Complete the form below to get your personalized recommendations
          </p>
        </div>

        <RowSteps
          className="mb-10"
          currentStep={Step}
          steps={[
            { title: "Personal & Contact" },
            { title: "Financial Situation" },
            { title: "Experience & Knowledge" },
            { title: "Preferences" },
            { title: "Additional Information" },
          ]}
          onStepChange={handleStepChange}
        />
        <Modal
          hideCloseButton={true}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex flex-col justify-center items-center ">
                  <svg
                    height={100}
                    viewBox="0 0 20 20"
                    width={100}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipRule="evenodd" fill="#519c4a" fillRule="evenodd">
                      <path
                        d="M3.278 9.121c.537-.536.95-1.562.935-2.32a2.65 2.65 0 0 1 .778-1.932a2.65 2.65 0 0 1 2.014-.775c.714.036 1.616-.31 2.12-.816a2.66 2.66 0 0 1 3.76 0c.505.505 1.406.852 2.12.816a2.65 2.65 0 0 1 2.015.775a2.65 2.65 0 0 1 .777 1.933c-.015.757.4 1.784.935 2.32a2.663 2.663 0 0 1-.006 3.765c-.528.528-.914 1.438-.928 2.184a2.65 2.65 0 0 1-.778 1.826a2.65 2.65 0 0 1-1.748.775c-.791.04-1.827.5-2.387 1.06a2.66 2.66 0 0 1-3.76 0c-.56-.56-1.595-1.02-2.386-1.06a2.65 2.65 0 0 1-1.748-.775a2.65 2.65 0 0 1-.778-1.824c-.015-.748-.406-1.664-.935-2.193a2.66 2.66 0 0 1 0-3.759"
                        opacity={0.2}
                      />
                      <path d="M4.198 4.077a1.65 1.65 0 0 0-.485 1.205c.01.55-.13 1.132-.333 1.636c-.203.505-.506 1.022-.894 1.411a1.66 1.66 0 0 0 0 2.345c.71.711 1.206 1.873 1.227 2.879a1.654 1.654 0 0 0 1.575 1.621c.55.027 1.129.194 1.637.42c.507.225 1.019.542 1.408.931a1.66 1.66 0 0 0 2.345 0c.389-.389.9-.706 1.408-.932c.508-.225 1.087-.392 1.637-.419a1.653 1.653 0 0 0 1.575-1.623c.02-1.002.509-2.159 1.22-2.87a1.663 1.663 0 0 0 .007-2.352c-.388-.388-.69-.905-.894-1.41s-.344-1.087-.333-1.637a1.65 1.65 0 0 0-.486-1.205a1.65 1.65 0 0 0-1.256-.484c-.996.05-2.173-.402-2.878-1.107a1.66 1.66 0 0 0-2.345 0c-.705.705-1.882 1.157-2.878 1.107a1.65 1.65 0 0 0-1.257.484M2.713 5.3c.015.758-.398 1.785-.935 2.321a2.66 2.66 0 0 0 0 3.759c.53.529.92 1.445.935 2.192c.014.662.273 1.32.778 1.825a2.65 2.65 0 0 0 1.748.775c.791.04 1.827.499 2.387 1.06a2.66 2.66 0 0 0 3.759 0c.56-.561 1.596-1.02 2.387-1.06a2.65 2.65 0 0 0 1.748-.775a2.65 2.65 0 0 0 .777-1.826c.015-.747.4-1.656.929-2.184a2.663 2.663 0 0 0 .006-3.766c-.536-.536-.95-1.562-.934-2.32a2.65 2.65 0 0 0-.778-1.933a2.65 2.65 0 0 0-2.015-.775c-.714.036-1.615-.31-2.12-.816a2.66 2.66 0 0 0-3.76 0c-.504.506-1.406.852-2.12.816a2.65 2.65 0 0 0-2.014.775A2.65 2.65 0 0 0 2.713 5.3" />
                      <path d="M12.298 6.564a.5.5 0 0 1 .194.68l-2.777 5a.5.5 0 1 1-.874-.486l2.777-5a.5.5 0 0 1 .68-.194" />
                      <path d="M6.11 9.466a.5.5 0 0 1 .702-.078L9.59 11.61a.5.5 0 0 1-.625.781L6.188 10.17a.5.5 0 0 1-.078-.703" />
                    </g>
                  </svg>
                  <h1
                    className={
                      "w-full text-xl my-2 text-default-800 block max-w-full text-center "
                    }
                  >
                    Your Mutual Funds Are Ready !
                  </h1>
                </div>
              </ModalHeader>
              <ModalBody>
                <p className="rounded-full text-center text-default-600">
                  Join us and unlock the potential of your investments with
                  personalized recommendations and expert insights.
                </p>
              </ModalBody>
              <ModalFooter>
                <div className="flex flex-col justify-center items-center gap-3 w-full">
                  <Button
                    className="bg-gradient-to-r from-[#E7649C] to-[#fc3c61] text-white w-full"
                    onPress={() => {
                      navigate("/signup?redirect=recommended");
                    }}
                  >
                    Create an account{" "}
                  </Button>
                  <p className="text-center text-small">
                    You have an account?&nbsp;
                    <Link href="login" size="sm">
                      Login
                    </Link>
                  </p>
                </div>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>

        {Step === 0 ? (
          <PersonalForm
            PersonalFromData={PersonalFromData}
            setIsPersonalFormValid={setIsPersonalFormValid}
            setPersonalFormData={setPersonalFormData}
            setStep={setStep}
          />
        ) : Step === 1 ? (
          <FinancialForm
            FinancialFormData={FinancialFormData}
            setFinancialFormData={setFinancialFormData}
            setIsFinancialFormValid={setIsFinancialFormValid}
            setStep={setStep}
          />
        ) : Step === 2 ? (
          <ExperienceForm
            experienceFormData={ExperienceFormData}
            setExperienceFormData={setExperienceFormData}
            setIsExperienceFormValid={setIsExperienceFormValid}
            setStep={setStep}
          />
        ) : Step == 3 ? (
          <PreferencesFrom
            PreferencesFormData={PreferencesFormData}
            setIsPreferencesFormValid={setIsPreferencesFormValid}
            setPreferencesFormData={setPreferencesFormData}
            setStep={setStep}
          />
        ) : (
          <AdditionalInformationForm
            AdditionalInformationFormData={AdditionalInformationFormData}
            setAdditionalInformationFormData={setAdditionalInformationFormData}
            setIsAdditionalInformationFormValid={
              setIsAdditionalInformationFormValid
            }
            setStep={setStep}
          />
        )}
      </section>
    </DefaultLayout>
  );
}
