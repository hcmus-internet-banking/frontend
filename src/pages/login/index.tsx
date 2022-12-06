import { useFormik } from "formik";
import Button from "../../components/common/Button/Button";
import Heading from "../../components/common/Heading/Heading";
import Input from "../../components/common/Input/Input";
import Spacer from "../../components/common/Spacer/Spacer";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useMemo } from "react";
import { loginSchema } from "../../lib/login/schema";
import { useRouter } from "next/router";
import { loginAsync, selectIsAuthenticated } from "../../store/auth";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../store/store";

function Index() {
  const loginValidate = useMemo(() => loginSchema, []);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const formik = useFormik({
    initialValues: {
      email: (router.query.email as string) || "",
      password: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: toFormikValidationSchema(loginValidate),
    onSubmit: async (values) => {
      console.log(values);

      const result = dispatch(
        loginAsync({ email: values.email, password: values.password })
      ).unwrap();

      toast.promise(result, {
        loading: "Loading...",
        success: ({ data }) => {
          if (data.id !== null) {
            toast.success(JSON.stringify(data));
            router.push("/");
          }
          return "Success";
        },
        error: (error) => {
          return error.message;
        },
      });
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

            <Button type="submit">
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
