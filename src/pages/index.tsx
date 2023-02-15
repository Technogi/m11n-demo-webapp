import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import { Analytics } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
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
            sx={{ fontSize: "3em", marginRight: "1rem" }}
          />{" "}
          POStats
        </Typography>
        <br />
        <Link href={"/sales"} passHref>
          <Button variant="contained">Go to POS Sales Stats</Button>
        </Link>
      </Box>
    </Container>
  );
}
