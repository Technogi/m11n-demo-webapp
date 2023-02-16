import { Container, Typography, Link as UILink } from "@mui/material";
import { teal } from "@mui/material/colors";
import Link from "next/link";
import { FC } from "react";

const SimpleHeader: FC = () => (
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
          <UILink color="inherit">M11n</UILink>
        </Link>
      </Typography>
      <Link href="/">
        <img alt="technogi" src="/technogi-teal-light.png" width={160} />
      </Link>
    </Container>
  </header>
);

export default SimpleHeader;
