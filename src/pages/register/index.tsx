import Card from "@/components/common/Card/Card";
import Heading from "@/components/common/Heading/Heading";
import { EmptyLayout } from "@/components/common/Layout";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { BarLoader } from "react-spinners";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import Spacer from "../../components/common/Spacer/Spacer";
import { noToastErrorOption } from "../../lib/common/utils/react-hot-toast";
import { registerSchema } from "../../lib/register/schema";
import { registerAsync, selectAuth } from "../../store/auth";
import { useAppDispatch } from "../../store/store";

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

            return "Register successully";
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
    <Card className="max-w-sm">
      {authState.loading && <BarLoader width={200} />}
      <Spacer className="h-12" />
      <Link href="login">
        <BiArrowBack className="cursor-pointer duration-300 hover:opacity-40" />
      </Link>
      <Heading size="lg" className="text-center">
        Register
      </Heading>
      <Spacer className="h-2" />
      <form onSubmit={formik.handleSubmit}>
        <section className="flex flex-col space-y-4">
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

          <Button type="submit" disabled={authState.loading} className="w-fit">
            <span>Register</span>
          </Button>
        </section>
      </form>
    </Card>
  );
}

Index.title = "Register";
Index.layout = EmptyLayout;

export default Index;
