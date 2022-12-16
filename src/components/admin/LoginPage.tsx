import { noToastErrorOption } from "@/lib/common/utils/react-hot-toast";
import { loginSchema } from "@/lib/login/schema";
import {
  selectIsAuthenticated,
  selectAuthLoading,
  loginAsync,
} from "@/store/auth";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useMemo, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { toFormikValidationSchema } from "zod-formik-adapter";
import AppLink from "../common/AppLink/AppLink";
import Button from "../common/Button/Button";
import Input from "../common/Input/Input";
import Heading from "../common/Heading/Heading";
import Spacer from "../common/Spacer/Spacer";

function LoginPage() {
  const loginValidate = useMemo(() => loginSchema, []);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const login = (values: {
    email: string;
    password: string;
    captchaValue: string;
  }) => {
    const result = dispatch(
      loginAsync({
        email: values.email,
        password: values.password,
        captchaValue: values.captchaValue,
      })
    ).unwrap();

    toast.promise(
      result,
      {
        loading: "Loading...",
        success: (data) => {
          if (data.id !== null) {
            toast.success(JSON.stringify(data));
            router.push("/");
          }
          return "Success";
        },
        error: null,
      },
      noToastErrorOption
    );
  };

  const formik = useFormik({
    initialValues: {
      email: (router.query.email as string) || "",
      password: "",
    },
    validateOnBlur: false,
    validateOnChange: isSubmitted,
    validationSchema: toFormikValidationSchema(loginValidate),
    onSubmit: async () => {
      setIsSubmitted(true);
      // Execute the reCAPTCHA when the form is submitted

      if (!captchaRef.current?.getValue()) {
        toast.error("Please verify captcha");
        return;
      }
      login({
        email: formik.values.email,
        password: formik.values.password,
        captchaValue: captchaRef.current?.getValue() || "",
      });

      captchaRef.current?.reset();
      // captchaRef.current?.execute();
    },
  });

  if (isAuthenticated) {
    router.push("/");
  }

  return (
    <div>
      <Spacer className="h-12" />

      <Heading>Admin Login</Heading>
      <Spacer className="h-2" />

      <form onSubmit={formik.handleSubmit}>
        <section className="space-y-2 pr-4">
          <Input
            className="w-full"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Email"
            error={formik.errors.email}
            disabled={isLoading}
            autoComplete="email"
          />

          <Input
            className="w-full"
            name="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Password"
            type="password"
            hiddenable
            error={formik.errors.password}
            disabled={isLoading}
          />

          <div className="h-1"></div>
          <Button type="submit" isLoading={isLoading}>
            <span>Login</span>
          </Button>
        </section>
      </form>

      <div className="h-4"></div>
      <div className="flex justify-between">
        <div>
          Bạn chưa có tài khoản?{" "}
          <AppLink
            onClick={() => {
              router.push("/register");
            }}
            text="Đăng ký"
          />
        </div>
        <div>
          <AppLink href="/login">User Login</AppLink>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
