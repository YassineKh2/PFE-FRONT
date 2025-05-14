import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { Icon } from "@iconify/react";
import { Link } from "@heroui/link";
import { Navigate, useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "@/services/Auth";
import { useAuth } from "../../providers/AuthProvider";
import {addToast} from "@heroui/toast";
import DefaultLayout from "@/layouts/default";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const { userLoggedIn } = useAuth();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    doSignInWithEmailAndPassword(email, password)
      .then(() => {
        navigate("/");
        addToast({
          title: "Success",
          description: "Welcome back!",
          color: "success",
          variant: "solid",
          timeout: 5000,
        })
      })
      .catch((error) => {
        addToast({
          title: "Failed",
          description: error.message,
          color: "danger",
          variant: "solid",
          timeout: 5000,
        })
      });
  };
  function LoginWithGoogle(): void {
    doSignInWithGoogle().then(() => {
      navigate("/");
    })
    .catch((error) => {
      console.error("Error signing in:", error);
    });
  }

  return (
    <>
      {userLoggedIn && <Navigate to={"/"} replace={true} />}
      <DefaultLayout>
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
            <div className="flex flex-col items-center pb-6">
              <img src="/Morgenfund_Logo_3.png" alt="morgenfund logo" className="w-24"/>
              <p className="text-xl font-medium">Welcome Back</p>
              <p className="text-small text-default-500">
                Log in to your account to continue
              </p>
            </div>
            <Form
              className="flex flex-col gap-3"
              validationBehavior="native"
              onSubmit={handleSubmit}
            >
              <Input
                isRequired
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
              />
              <Input
                isRequired
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
                name="password"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
              />
              <div className="flex w-full items-center justify-between px-1 py-2">
                <Checkbox name="remember" size="sm">
                  Remember me
                </Checkbox>
                <Link className="text-default-500" href="#" size="sm">
                  Forgot password?
                </Link>
              </div>
              <Button className="bg-gradient-to-r from-[#E7649C] to-[#fc3c61] text-white w-full" type="submit">
                Sign In
              </Button>
            </Form>
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
                onPress={() => LoginWithGoogle()}
              >
                Continue with Google
              </Button>
            </div>
            <p className="text-center text-small">
              Need to create an account?&nbsp;
              <Link href="signup" size="sm">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
