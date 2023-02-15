import { Months } from "@/utils";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  Slide,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { SyntheticEvent, forwardRef, useState } from "react";

const data = [
  { argument: 1, value: 10 },
  { argument: 2, value: 50 },
  { argument: 3, value: 30 },
];
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
  const currentMonth = new Date().getMonth();

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Monthly" {...a11yProps(0)} />
          {Months.filter((_, i) => i > currentMonth).map((month, i) => (
            <Tab label={month} key={`${month}_tab`} {...a11yProps(i + 1)} />
          ))}
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}></TabPanel>
      {Months.filter((_, i) => i > currentMonth).map((month, i) => (
        <TabPanel key={`${month}_tab_panel`} value={value} index={i + 1}>
          Predicciones {month}
        </TabPanel>
      ))}
    </Dialog>
  );
};

export default ForecastModal;
