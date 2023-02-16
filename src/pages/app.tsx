import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import { Analytics } from "@mui/icons-material";
import { Link as UILink } from "@mui/material";
import Head from "next/head";
import PrivateLayout from "@/components/PrivateLayout";

export default function Home() {
  return (
    <PrivateLayout>
      <>
        <Head>
          <title>Sales Stats | Technogi M11N</title>
        </Head>
        <Container maxWidth="lg">
          <Box
            sx={{
              my: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Analytics
                color="primary"
                sx={{ fontSize: "2.4em", marginRight: "1rem" }}
              />{" "}
              POStats
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              color={"GrayText"}
            >
              Your POS reaching the sky!
            </Typography>

            <Typography>
              For more information on how this app was implemented{" "}
            </Typography>
            <Link href="/info" passHref>
              <UILink>Click Here</UILink>
            </Link>
          </Box>
        </Container>
      </>
    </PrivateLayout>
  );
}
