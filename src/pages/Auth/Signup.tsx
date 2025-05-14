import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { Icon } from "@iconify/react";
import { Link } from "@heroui/link";
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from "@/services/Auth";
import { Navigate, useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useAuth } from "@/providers/AuthProvider";
import { addToast } from "@heroui/toast";
import { saveData } from "@/Helpers/Prefrences";
import { AdditionalInformationFormSchemaType, ExperienceFormSchemaType, FinancialFormSchemaType, PersonalFormSchemaType, PreferencesFormSchemaType } from "@/types/Onbording";

const signupSchema = z
  .object({
    fullname: z.string().min(1, "Full Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    terms: z
      .boolean()
      .refine((val) => val === true, "You must agree to the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormInputs = z.infer<typeof signupSchema>;

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  


  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();


  const searchParams = new URLSearchParams(window.location.search);
  const redirect = searchParams.get("redirect");
  let isRedirected  = false;

  if (redirect === "recommended") {
    isRedirected = true;
  }

  const saveLocalStroageData = (uid:string) => {

    const personalData = JSON.parse(
      localStorage.getItem("personalData") || "{}"
    ) as PersonalFormSchemaType;

    const experienceData = JSON.parse(
      localStorage.getItem("ExperienceFormData") || "{}"
    ) as ExperienceFormSchemaType;

    const preferencesData = JSON.parse(
      localStorage.getItem("PreferencesFormData") || "{}"
    ) as PreferencesFormSchemaType;

    const FinancialData = JSON.parse(
      localStorage.getItem("FinancialFormData") || "{}"
    ) as FinancialFormSchemaType;

    const AdditionalInformationData = JSON.parse(
      localStorage.getItem("AdditionalInformationFormData") || "{}"
    ) as AdditionalInformationFormSchemaType;


      saveData(
        uid,
        personalData,
        FinancialData,
        experienceData,
        preferencesData,
        AdditionalInformationData
      ).then(() => {
        addToast({
          title: "Welcome Aboard !",
          color: "success",
          description: "You can start exploring the app now.",
          variant: "solid",
          timeout: 5000,
        });
      }) 
   
  };


  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
    doCreateUserWithEmailAndPassword(data.email, data.password, data.fullname)
      .then((uid) => {
        if (isRedirected) {
          saveLocalStroageData(uid);
          navigate("/recommended");
        }
        navigate("/login");
      })
      .catch((error) => {
        addToast({
          title: "Failed",
          description: error.message,
          color: "danger",
          variant: "solid",
          timeout: 5000,
        });
      });
  };

  async function SignupWithGoogle() {
    try {
      const uid = await doSignInWithGoogle();
      if (isRedirected) {
        saveLocalStroageData(uid);
        navigate("/recommended");
      } else {
        navigate("/login");
      }
    } catch (error: any) {
      addToast({
        title: "Failed",
        description: error.message,
        color: "danger",
        variant: "solid",
        timeout: 5000,
      });
    }
  }

  return (
    <>
      {userLoggedIn && <Navigate to={"/"} replace={true} />}
      <DefaultLayout>
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
            <div className="flex flex-col items-center pb-6">
              <img
                src="/Morgenfund_Logo_3.png"
                alt="morgenfund logo"
                className="w-24"
              />
              <p className="text-xl font-medium">Welcome</p>
              <p className="text-small text-default-500">
                Create an account to get started
              </p>
            </div>

            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col">
                <Input
                  isRequired
                  classNames={{
                    base: "-mb-[2px]",
                    inputWrapper:
                      "rounded-b-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
                  }}
                  label="Full Name"
                  {...register("fullname")}
                  type="text"
                  variant="bordered"
                  errorMessage={errors.fullname?.message}
                />
                <Input
                  isRequired
                  classNames={{
                    base: "-mb-[2px]",
                    inputWrapper:
                      "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
                  }}
                  label="Email Address"
                  {...register("email")}
                  type="email"
                  variant="bordered"
                  errorMessage={errors.email?.message}
                />
                <Input
                  isRequired
                  classNames={{
                    base: "-mb-[2px]",
                    inputWrapper:
                      "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
                  }}
                  endContent={
                    <button type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <Icon
                          className="pointer-events-none text-2xl text-default-400"
                          icon="solar:eye-closed-linear"
                        />
                      ) : (
                        <Icon
                          className="pointer-events-none text-2xl text-default-400"
                          icon="solar:eye-bold"
                        />
                      )}
                    </button>
                  }
                  label="Password"
                  {...register("password")}
                  type={isVisible ? "text" : "password"}
                  variant="bordered"
                  errorMessage={errors.password?.message}
                />
                <Input
                  isRequired
                  classNames={{
                    inputWrapper: "rounded-t-none",
                  }}
                  endContent={
                    <button type="button" onClick={toggleConfirmVisibility}>
                      {isConfirmVisible ? (
                        <Icon
                          className="pointer-events-none text-2xl text-default-400"
                          icon="solar:eye-closed-linear"
                        />
                      ) : (
                        <Icon
                          className="pointer-events-none text-2xl text-default-400"
                          icon="solar:eye-bold"
                        />
                      )}
                    </button>
                  }
                  label="Confirm Password"
                  {...register("confirmPassword")}
                  type={isConfirmVisible ? "text" : "password"}
                  variant="bordered"
                  errorMessage={errors.confirmPassword?.message}
                  isInvalid={!!errors.confirmPassword?.message}
                />
              </div>
              <Checkbox
                isRequired
                className="py-4"
                size="sm"
                {...register("terms")}
              >
                I agree with the&nbsp;
                <Link href="#" size="sm">
                  Terms
                </Link>
                &nbsp; and&nbsp;
                <Link href="#" size="sm">
                  Privacy Policy
                </Link>
              </Checkbox>
              <Button
                className="bg-gradient-to-r from-[#E7649C] to-[#fc3c61] text-white"
                type="submit"
              >
                Sign Up
              </Button>
            </form>
            <div className="flex items-center gap-4 py-2">
              <Divider className="flex-1" />
              <p className="shrink-0 text-tiny text-default-500">OR</p>
              <Divider className="flex-1" />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                startContent={
                  <Icon icon="flat-color-icons:google" width={24} />
                }
                variant="bordered"
                onPress={()=>{SignupWithGoogle()}}
              >
                Sign Up with Google
              </Button>
            </div>
            <p className="text-center text-small">
              Already have an account?&nbsp;
              <Link href="/login" size="sm">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
