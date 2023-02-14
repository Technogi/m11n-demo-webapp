import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../theme";
import createEmotionCache from "../createEmotionCache";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import LeftMenu from "@/components/LeftMenu";
import { Container, Grid } from "@mui/material";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ResponsiveAppBar />
        <Grid container>
          <Grid xs={2} item>
            <LeftMenu />
          </Grid>
          <Grid xs={10} item color={"gray"}>
            <main
              style={{
                marginTop: "1em",
                padding: "1em",
              }}
            >
              <Component {...pageProps} />
            </main>
          </Grid>
        </Grid>
      </ThemeProvider>
    </CacheProvider>
  );
}
