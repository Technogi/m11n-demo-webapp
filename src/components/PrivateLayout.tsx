import { FC, ReactNode } from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Head from "next/head";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Analytics } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Footer from "./Footer";

const PrivateLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <ResponsiveAppBar />
      <main style={{ marginTop: "1em", padding: "1em" }}>{children}</main>
    </>
  );
};

export default withAuthenticator(PrivateLayout, {
  variation: "default",
  hideSignUp: true,
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
          <br />
          <Footer />
        </>
      );
    },
    Header() {
      return (
        <>
          <Head>
            <title>M11n POStats | Technogi </title>
          </Head>
          <div>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                marginTop: {
                  xs: 3,
                  sm: 6,
                  md: 8,
                  lg: 8,
                },
                marginBottom: "1em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Analytics
                color="primary"
                sx={{ fontSize: "2.4em", marginRight: "1rem" }}
              />{" "}
              POStats
            </Typography>
          </div>
        </>
      );
    },
  },
});
