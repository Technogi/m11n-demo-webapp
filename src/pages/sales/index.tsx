import { NextPage } from "next";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import { forwardRef, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { Close, Replay } from "@mui/icons-material";
import useSWR from "swr";
import { grey } from "@mui/material/colors";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

type Props = {
  total: number;
  items: any[];
};

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
        <div>{productName} Forecast</div>
        <div>
          <Button onClick={onClose}>
            <Close />
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

const fetcher = (url: string) =>
  fetch(url, { mode: "cors" }).then((r) => r.json());

const SalesPage: NextPage = () => {
  const [showForecast, setShowForecast] = useState<boolean>(false);
  const [forecastId, setForecastId] = useState<number>();
  const { data, error, isLoading, isValidating, mutate } = useSWR<{
    total: number;
    items: { id: number; price: number; sales: number; name: string }[];
  }>(process.env.NEXT_PUBLIC_API_URL, fetcher);

  if (isLoading || isValidating) {
    return (
      <Container sx={{ textAlign: "center", paddingTop: "5em" }}>
        <CircularProgress size={60} />
        <Typography color="teal" fontSize={20} paddingTop={4}>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 10em)",
          backgroundColor: grey[50],
          padding: "2em",
          overflow: "scroll",
        }}
      >
        <Typography color="red" fontSize={24}>
          ERROR:
        </Typography>
        <Typography fontFamily="monospace" color="red" fontSize={16}>
          <pre>{JSON.stringify(error, null, 4)}</pre>
        </Typography>
      </Box>
    );
  }
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      align: "center",
      headerAlign: "center",
      renderCell({ value }) {
        return (
          <Button
            variant="text"
            onClick={() => {
              setShowForecast(true);
              setForecastId(value);
            }}
          >
            {value}
          </Button>
        );
      },
    },
    { field: "name", headerName: "Product Name", width: 150, sortable: true },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell(params) {
        return currency.format(params.value);
      },
    },

    {
      field: "sales",
      headerName: "#Sales",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "total",
      headerName: "Total sold",
      width: 150,
      headerAlign: "right",
      align: "right",
      renderCell({ value }) {
        return currency.format(value);
      },
    },
    {
      field: "performance",
      headerName: "Performance",
      width: 200,
      headerAlign: "center",
      renderCell({ value }) {
        let color: string = "#fcc735";
        if (value < 0.3) color = "#fc6335";
        if (value > 0.7) color = "#34eb83";

        return (
          <div
            style={{
              width: "80%",
              border: "solid 1px",
              borderColor: "#ccc",
            }}
          >
            <div
              style={{
                backgroundColor: color,
                width: `${value * 100}%`,
                paddingLeft: "2em",
                paddingRight: "2em",
                textAlign: "center",
              }}
            >
              {Math.floor(value * 100)}
            </div>
          </div>
        );
      },
    },
  ];

  const maxSales =
    data?.items.reduce((acc, { sales }) => {
      const val = sales;
      return val > acc ? val : acc;
    }, 0) || 1;

  return (
    <Container style={{ height: "calc(100vh - 12em)" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={1}
        padding={1}
        marginBottom={2}
      >
        <Typography variant="h4" component="h1">
          Sales Stats
        </Typography>
        <IconButton onClick={() => mutate()}>
          <Replay color="primary" fontSize="large" />
        </IconButton>
      </Box>
      <DataGrid
        rows={
          data?.items
            ?.map(({ price, sales, ...props }) => ({
              ...props,
              price,
              sales,
              performance: Math.round((sales / maxSales) * 100) / 100,
              total: sales * price,
            }))
            ?.sort((a, b) => b.performance - a.performance) || []
        }
        columns={columns}
      />
      <ForecastModal
        open={showForecast}
        onClose={() => setShowForecast(false)}
        productId={forecastId}
        productName={data?.items?.find(({ id }) => id === forecastId)?.name}
      />
    </Container>
  );
};

export default SalesPage;
