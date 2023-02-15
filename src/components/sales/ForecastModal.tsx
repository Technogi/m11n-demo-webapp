import { Months } from "@/utils";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Dialog,
  Slide,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { SyntheticEvent, forwardRef, useState } from "react";
import Forecast from "./Forecast";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ForecastModalProps = {
  open: boolean;
  onClose: () => void;
  productId?: number;
  productName?: string;
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const ForecastModal = ({
  open,
  onClose,
  productId,
  productName,
}: ForecastModalProps) => {
  return (
    <Dialog open={open} fullScreen TransitionComponent={Transition}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1em",
        }}
      >
        <Typography variant="h5">{productName} Sales Forecasts</Typography>
        <div>
          <Button onClick={onClose}>
            <Close />
          </Button>
        </div>
      </div>
      <Forecast productId={productId} />
    </Dialog>
  );
};

export default ForecastModal;
