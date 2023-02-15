import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider as AmplifyThemeProvider } from "@aws-amplify/ui-react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../theme";
import createEmotionCache from "../createEmotionCache";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import LeftMenu from "@/components/LeftMenu";
import { Container, Grid, createTheme } from "@mui/material";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "../styles/globals.css";
import { teal } from "@mui/material/colors";

Amplify.configure({
  Auth: {
    region: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION,
    userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_WEB_CLIENT_ID,
    //mandatorySignIn: true,
    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    //authenticationFlowType: "USER_PASSWORD_AUTH",

    // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    clientMetadata: { project: "m11n-demo" },
  },
  ssr: true,
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const theme = createTheme({
    palette: {
      primary: teal,
    },
  });
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ResponsiveAppBar />

        <main
          style={{
            marginTop: "1em",
            padding: "1em",
          }}
        >
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
// export default withAuthenticator(MyApp, {
//   variation: "modal",
//   components: {
//     Footer() {
//       return (
//         <>
//           <div
//             style={{
//               marginTop: "2em",
//               textAlign: "center",
//               backgroundColor: "#ccc",
//               fontSize: "1.1em",
//               borderRadius: "10px",
//               padding: "0.3em",
//               color: "#222",
//             }}
//           >
//             Welcome to Technogi&apos;s M11N Demo WebApp
//           </div>
//           <div
//             style={{ marginTop: "2rem", color: "#222", textAlign: "center" }}
//           >
//             This application is optimized to run on Desktops
//           </div>
//         </>
//       );
//     },
//     Header() {
//       return (
//         <>
//           <Head>
//             <title>Technogi M11N Demo</title>
//           </Head>
//         </>
//       );
//     },
//   },
// });
