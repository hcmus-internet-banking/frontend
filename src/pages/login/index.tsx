import Card from "@/components/common/Card/Card";
import AppLink from "@/components/common/AppLink/AppLink";
import { EmptyLayout } from "@/components/common/Layout";
import { env } from "@/core/env/client.mjs";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useMemo, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Button from "../../components/common/Button/Button";
import Heading from "../../components/common/Heading/Heading";
import Input from "../../components/common/Input/Input";
import Spacer from "../../components/common/Spacer/Spacer";
import useToggle from "../../lib/common/hooks/useToggle";
import { noToastErrorOption } from "../../lib/common/utils/react-hot-toast";
import { loginSchema } from "../../lib/login/schema";
import {
  loginAsync,
  selectAuthLoading,
  selectIsAuthenticated,
} from "../../store/auth";
import { useAppDispatch, useAppSelector } from "../../store/store";

function Index() {
  const loginValidate = useMemo(() => loginSchema, []);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const { value: isSubmitted, setValue: setIsSubmitted } = useToggle(false);
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
            router.push("/");
          }
          return "Login successfully";
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
    },
  });

  if (isAuthenticated) {
    router.push("/");
  }

  return (
    <>
      <Spacer className="h-12" />

      <Card className="mx-auto max-w-xl">
        <Spacer className="h-12" />
        <Heading size="lg">Login</Heading>
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
            <div>
              <ReCAPTCHA
                sitekey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                ref={captchaRef}
              />
            </div>
            <div className="h-2"></div>
            <Button type="submit" isLoading={isLoading}>
              <span>Login</span>
            </Button>
          </section>
        </form>

        <div className="h-3"></div>
        <div className="flex justify-between">
          <div>
            <AppLink href="/forget-password">Quên mật khẩu?</AppLink>
          </div>
          <div>
            <AppLink href="https://boilerplate-svelte.vercel.app/">
              Admin Login
            </AppLink>
          </div>
        </div>
      </Card>
    </>
  );
}
Index.layout = EmptyLayout;
Index.title = "Login";

export default Index;
