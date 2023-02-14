import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Button, Dialog, Slide } from "@mui/material";
import { forwardRef, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { Close } from "@mui/icons-material";

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
function mapVal(val: Record<"S" | "N", string>) {
  return val.N ? parseFloat(val.N) : val.S;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL || "");
  const data = (await res.json()) as { total: number; items: any[] };

  const maxSales = data.items.reduce((acc, { sales }) => {
    const val = sales;
    return val > acc ? val : acc;
  }, 0);

  return {
    props: {
      total: data.total,
      items: data.items
        .map(({ price, sales, ...props }) => ({
          ...props,
          price,
          sales,
          performance: Math.round((sales / maxSales) * 100) / 100,
          total: sales * price,
        }))
        .sort((a, b) => b.sales - a.sales),
    },
  };
};

const SalesPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ items }) => {
  const [showForecast, setShowForecast] = useState<boolean>(false);
  const [forecastId, setForecastId] = useState<number>();

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

  return (
    <div style={{ height: "calc(100vh - 7em)", width: "100%" }}>
      <DataGrid rows={items} columns={columns} />
      <ForecastModal
        open={showForecast}
        onClose={() => setShowForecast(false)}
        productId={forecastId}
        productName={items?.find(({ id }) => id === forecastId)?.name}
      />
    </div>
  );
};

export default SalesPage;
