import { useFormik } from "formik";
import Button from "../../components/common/Button/Button";
import Heading from "../../components/common/Heading/Heading";
import Input from "../../components/common/Input/Input";
import Spacer from "../../components/common/Spacer/Spacer";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { registerAsync, selectAuth } from "../../store/auth";
import { registerSchema } from "../../lib/register/schema";
import { BarLoader } from "react-spinners";
import { useAppDispatch } from "../../store/store";
import toast from "react-hot-toast";
import { noToastErrorOption } from "../../lib/common/utils/react-hot-toast";

function Index() {
  const registerValidate = useMemo(() => registerSchema, []);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authState = useSelector(selectAuth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repassword: "",
      firstName: "",
      lastName: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: toFormikValidationSchema(registerValidate),
    onSubmit: async (values) => {
      toast.promise(
        dispatch(
          registerAsync({
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
          })
        ).unwrap(),
        {
          loading: "Registering...",
          success: () => {
            router.push({
              pathname: "/login",
              query: { email: values.email },
            });

            return "Register success";
          },
          error: null,
        },
        noToastErrorOption
      );
    },
  });

  // listen to selector
  useEffect(() => {
    const isLogin = authState.user !== null;

    if (isLogin) {
      router.push("/");
    }
  }, [authState.user, router]);

  return (
    <div>
      {authState.loading && <BarLoader width={200} />}

      <Spacer className="h-12" />
      <Heading>Register</Heading>
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
              autoComplete="none"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              type="password"
              hiddenable
              error={formik.errors.password}
            />

            <Input
              className="w-full"
              name="repassword"
              autoComplete="none"
              value={formik.values.repassword}
              onChange={formik.handleChange}
              placeholder="Re-password"
              type="password"
              hiddenable
              error={formik.errors.repassword}
            />

            <Input
              className="w-full"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              placeholder="First name"
              error={formik.errors.firstName}
            />

            <Input
              className="w-full"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              placeholder="Last name"
              error={formik.errors.lastName}
            />

            <Button type="submit" disabled={authState.loading}>
              <span>Register</span>
            </Button>
          </section>
        </form>
      </div>
    </div>
  );
}

Index.title = "Register";

export default Index;
