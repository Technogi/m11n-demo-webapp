import {
  Box,
  Button,
  Container,
  Typography,
  Link as UILink,
} from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { grey, teal } from "@mui/material/colors";
import Footer from "@/components/Footer";
import Link from "next/link";

const InfoPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>M11n | Technogi</title>
        <meta property="og:title" content="M11n" key="title" />
        <meta
          name="description"
          content="An expedient, streamlined, and fiscally prudent strategy for Cloud migration and software modernization"
          key="desc"
        />
        <meta
          name="description"
          content="An expedient, streamlined, and fiscally prudent strategy for Cloud migration and software modernization"
          key="desc"
        />
        <meta property="og:title" content="M11n Architecture" />
        <meta
          property="og:description"
          content="An expedient, streamlined, and fiscally prudent strategy for Cloud migration and software modernization"
        />
        <meta
          property="og:image"
          content="https://m11n-web-demo.io.technogi.com.mx/technogi.png"
        />
      </Head>
      <header style={{ backgroundColor: teal[600], padding: "0.5em" }}>
        <Container
          style={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color={teal[50]}
            fontWeight={900}
          >
            <Link href="/" passHref legacyBehavior>
              <UILink color="inherit">M11N</UILink>
            </Link>
          </Typography>
          <img alt="technogi" src="/technogi-teal-light.png" width={160} />
        </Container>
      </header>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h2"
              variant="h4"
              marginBottom={6}
              borderBottom={1}
            >
              Architecture
            </Typography>
            <img
              alt="m11n diagram"
              src="/m11n-schema.drawio.png"
              width="100%"
            />

            <Typography variant="h6" align="center" color={grey[800]} paragraph>
              ...
            </Typography>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
};

export default InfoPage;
