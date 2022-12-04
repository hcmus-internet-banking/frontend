import { GetServerSideProps } from "next";
import { getSession, GetSessionParams, signIn } from "next-auth/react";
import Button from "../../components/common/Button/Button";
import Heading from "../../components/common/Heading/Heading";
import Input from "../../components/common/Input/Input";
import Spacer from "../../components/common/Spacer/Spacer";
import useInput from "../../lib/hooks/useInput";

function Index(props: any) {
  const { onChange, value } = useInput("");

  console.log("session", props);

  const handleLoginDiscord = () => signIn("discord");

  return (
    <div>
      <Spacer className="h-12" />

      <Heading>Login</Heading>

      <Spacer className="h-2" />

      <div className="grid grid-cols-2 divide-x">
        <section className="space-y-2 pr-4">
          <Input
            className="w-full"
            value={value}
            onChange={onChange}
            placeholder="Email"
          />

          <Input
            className="w-full"
            value={value}
            onChange={onChange}
            placeholder="Password"
            type="password"
            hiddenable
          />

          <Button>
            <span>Login</span>
          </Button>
        </section>

        <section className="space-y-2 pl-4">
          <Button onClick={handleLoginDiscord}>
            <span>Login with Discord</span>
          </Button>
        </section>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context as GetSessionParams);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Index;
