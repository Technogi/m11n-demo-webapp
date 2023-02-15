import { FC, ReactNode } from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Head from "next/head";
import { withAuthenticator } from "@aws-amplify/ui-react";

const PrivateLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <ResponsiveAppBar />
      <main style={{ marginTop: "1em", padding: "1em" }}>{children}</main>
    </>
  );
};

export default withAuthenticator(PrivateLayout, {
  variation: "modal",
  components: {
    Footer() {
      return (
        <>
          <div
            style={{
              marginTop: "2em",
              textAlign: "center",
              backgroundColor: "#ccc",
              fontSize: "1.1em",
              borderRadius: "10px",
              padding: "0.3em",
              color: "#222",
            }}
          >
            Welcome to Technogi&apos;s M11N Demo WebApp
          </div>
          <div
            style={{ marginTop: "2rem", color: "#222", textAlign: "center" }}
          >
            This application is optimized to run on Desktops
          </div>
        </>
      );
    },
    Header() {
      return (
        <>
          <Head>
            <title>Technogi M11N Demo</title>
          </Head>
        </>
      );
    },
  },
});
