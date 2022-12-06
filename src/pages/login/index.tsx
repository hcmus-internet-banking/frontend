import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useMemo } from "react";
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

  const formik = useFormik({
    initialValues: {
      email: (router.query.email as string) || "",
      password: "",
    },
    validateOnBlur: false,
    validateOnChange: isSubmitted,
    validationSchema: toFormikValidationSchema(loginValidate),
    onSubmit: async (values) => {
      setIsSubmitted(true);

      const result = dispatch(
        loginAsync({ email: values.email, password: values.password })
      ).unwrap();

      toast.promise(
        result,
        {
          loading: "Loading...",
          success: ({ data }) => {
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
    },
  });

  if (isAuthenticated) {
    router.push("/");
  }
  return (
    <div>
      <Spacer className="h-12" />

      <Heading>Login</Heading>
      <Spacer className="h-2" />

      <div className="grid grid-cols-2 divide-x">
        <form onSubmit={formik.handleSubmit}>
          <section className="space-y-2 pr-4">
            <Input
              className="w-full"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email"
              error={formik.errors.email}
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
            />

            <Button type="submit" isLoading={isLoading}>
              <span>Login</span>
            </Button>
          </section>
        </form>

        <section className="space-y-2 pl-4">
          <Button
            onClick={() => {
              router.push("/register");
            }}
          >
            <span>Register</span>
          </Button>
        </section>
      </div>
    </div>
  );
}

export default Index;
