import { Box, Link, Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="primary.contrastText" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://technogi.com.mx/">
        Technogi
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default function Footer() {
  return (
    <Box
      sx={{ bgcolor: "primary.main", p: 3, color: "primary.contrastText" }}
      component="footer"
    >
      <Typography
        variant="subtitle1"
        align="center"
        color="primary.contrastText"
        component="p"
      >
        Keeping IT Simple since 2012
      </Typography>
      <Copyright />
    </Box>
  );
}
