import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 150 },
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

type Props = {
  total: number;
  items: any[];
};

function mapVal(val: Record<"S" | "N", string>) {
  return val.N ? parseFloat(val.N) : val.S;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL || "");
  const data = (await res.json()) as { ScannedCount: number; Items: any[] };

  const maxSales = data.Items.reduce((acc, { sales }) => {
    const val = parseInt(sales.N);
    return val > acc ? val : acc;
  }, 0);
  return {
    props: {
      total: data.ScannedCount,
      items: data.Items.map(({ price, sales, name, product_id }) => ({
        price: parseFloat(price.N),
        sales: parseInt(sales.N),
        performance: Math.round((parseInt(sales.N) / maxSales) * 100) / 100,
        total: parseInt(sales.N) * parseFloat(price.N),
        name: name.S,
        id: parseInt(product_id.N),
      })).sort((a, b) => b.sales - a.sales),
    },
  };
};

const SalesPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ items }) => {
  return (
    <div style={{ height: "calc(100vh - 7em)", width: "100%" }}>
      <DataGrid rows={items} columns={columns} />
    </div>
  );
};

export default SalesPage;
