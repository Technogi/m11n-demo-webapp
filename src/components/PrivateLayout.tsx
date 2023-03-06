import { FC, ReactNode } from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Head from "next/head";
import {
  Authenticator,
  CheckboxField,
  SelectField,
  TextField,
  useAuthenticator,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { Analytics } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Footer from "./Footer";
import Link from "next/link";
import RegistrationLink from "./login/RegistrationLink";
import { I18n } from "aws-amplify";

I18n.putVocabularies({
  en: {
    Username: "Email",
    "Enter your Username": "Enter your Email (this will be your username)",
  },
});

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
  hideSignUp: false,
  components: {
    SignUp: {
      FormFields() {
        const { validationErrors } = useAuthenticator();

        return (
          <>
            <TextField
              label="Company Name"
              placeholder="Enter the name of your company"
              required
              errorMessage={validationErrors.company as string}
              hasError={!!validationErrors.company}
            />
            <SelectField
              label="Your role"
              options={[
                "Developer",
                "Manager",
                "Project Manager",
                "Executive",
                "Other",
              ]}
            />
            <Authenticator.SignUp.FormFields />
            <CheckboxField
              errorMessage={validationErrors.acknowledgement as string}
              hasError={!!validationErrors.acknowledgement}
              name="acknowledgement"
              value="yes"
              label="I agree with the Terms & Conditions"
            />
          </>
        );
      },
    },
    Footer() {
      return (
        <>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100vw",
            }}
          >
            <Footer />
          </div>
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
