import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import { Analytics } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function Home() {
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
            sx={{ fontSize: "2.4em", marginRight: "1rem" }}
          />{" "}
          POStats
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom color={"GrayText"}>
          Your POS reaching the sky!
        </Typography>
      </Box>
    </Container>
  );
}
