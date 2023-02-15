import { CircularProgress, Container, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Container sx={{ textAlign: "center", paddingTop: "5em" }}>
      <CircularProgress size={60} />
      <Typography color="teal" fontSize={20} paddingTop={4}>
        Loading...
      </Typography>
    </Container>
  );
}
