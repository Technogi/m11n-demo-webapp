import Loading from "@/components/Loading";
import {
  Authenticator,
  useAuthenticator,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { Hub } from "aws-amplify";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SignOutPage = () => {
  const { signOut, authStatus } = useAuthenticator((context) => [context.user]);
  const router = useRouter();

  const redirectToHome = () => {
    setTimeout(() => {
      router.push("/app");
    }, 1000);
  };

  useEffect(() => {
    signOut();

    if (authStatus !== "authenticated") redirectToHome();
    return Hub.listen("auth", (data) => {
      if (data?.payload?.event === "signOut") redirectToHome();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loading />;
};

const WithAuthSingOutPage: NextPage = () => {
  return (
    <Authenticator.Provider>
      <SignOutPage />
    </Authenticator.Provider>
  );
};

export default WithAuthSingOutPage;
