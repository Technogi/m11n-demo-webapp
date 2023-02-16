import * as React from "react";
import Button from "@mui/material/Button";
import ArticleIcon from "@mui/icons-material/Article";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import { grey, teal } from "@mui/material/colors";
import Head from "next/head";
import Footer from "@/components/Footer";

export default function HomePage() {
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
            <div style={{ textAlign: "center", marginBottom: "1em" }}>
              <img alt="technogi" src="/technogi.png" width={200} />
            </div>
            <Typography
              component="h1"
              variant="h1"
              align="center"
              color={teal[600]}
              fontWeight={900}
              gutterBottom
            >
              M11N
            </Typography>
            <Typography variant="h6" align="center" color={grey[800]} paragraph>
              M11N is a cloud migration and modernization strategy developed by
              Technogi, built on the principles of Domain Driven Development and
              implemented through the Event Sourcing pattern. M11N offers a
              fast, simple, and highly efficient approach to upgrading your
              legacy systems and embracing the latest cloud technologies.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                LinkComponent={NextLink}
                href="/app"
                target="_blank"
                endIcon={<OpenInNewIcon />}
                variant="contained"
              >
                Open Sample Web App
              </Button>
              <Button
                LinkComponent={NextLink}
                href="https://github.com/Technogi/m11n-demo-hermes"
                target="_blank"
                endIcon={<GitHubIcon />}
                variant="outlined"
                color="secondary"
              >
                Sample Web App Source Code
              </Button>
              <Button
                LinkComponent={NextLink}
                href="/info"
                endIcon={<ArticleIcon />}
                variant="outlined"
              >
                Learn more
              </Button>
            </Stack>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
