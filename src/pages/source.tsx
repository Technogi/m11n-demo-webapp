import Footer from "@/components/Footer";
import SimpleHeader from "@/components/SimpleHeader";
import { GitHub } from "@mui/icons-material";
import { Container, Grid, Link, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { NextPage } from "next";
import Head from "next/head";
import { FC, ReactNode } from "react";

const Item: FC<{ children: ReactNode; url: string }> = ({ children, url }) => (
  <Grid
    container
    spacing={2}
    sx={{
      borderBottom: `1px solid ${grey[300]}`,
      paddingY: 1,
    }}
  >
    <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: "center" }}>
      <GitHub />
      <span style={{ marginLeft: "1rem" }}>{children}</span>
    </Grid>
    <Grid item xs={12} md={8}>
      <Link target="_blank" href={url}>
        {url}
      </Link>
    </Grid>
  </Grid>
);

const description = "Source code for AWS based demo implementing M11n Strategy";
const title = "M11n Samples Source Code";
const SourceCodePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>M11n Source Code | Technogi</title>
        <meta property="title" content={title} />
        <meta name="description" content={description} key="desc" />
        <meta property="og:title" content={title} key="title" />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://m11n-web-demo.io.technogi.com.mx/technogi.png"
        />
      </Head>
      <SimpleHeader />
      <main>
        <Container sx={{ padding: 4, minHeight: "calc(100vh - 9em)" }}>
          <Typography variant="h5" component="h1" marginBottom={4}>
            Source Code
          </Typography>
          <Item url="https://github.com/Technogi/m11n-demo-hermes">
            Events Endpoint (Hermes)
          </Item>
          <Item url="https://github.com/Technogi/m11n-demo-api">API</Item>
          <Item url="https://github.com/Technogi/m11n-demo-pos">Demo POS</Item>
          <Item url="https://github.com/Technogi/m11n-demo-webapp">
            Demo Web App
          </Item>
          <Item url="soon">Demo Mobile App (ReactNative)</Item>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default SourceCodePage;
