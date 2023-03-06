import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { FC } from "react";

const RegistrationLink: FC = () => {
  const theme = useTheme();
  return (
    <Card sx={{ marginTop: 5 }} variant="outlined">
      <CardContent>
        <Typography textAlign={"center"}>
          For trying this application please register:{" "}
          <Button
            href="/registration"
            LinkComponent={Link}
            variant="contained"
            disableElevation
          >
            here
          </Button>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RegistrationLink;
