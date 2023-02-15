import { Months } from "@/utils";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Icon,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Loading from "../Loading";
import { grey } from "@mui/material/colors";
import { ArrowForward } from "@mui/icons-material";

const ByMonth = -1;

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const queryClient = new QueryClient();

type ForecastItem = {
  Timestamp: string;
  Value: number;
};

type ForecastType = {
  p90: ForecastItem[];
  p50: ForecastItem[];
  p10: ForecastItem[];
};

type ForecastChartItem = {
  name?: string;
  p90?: number;
  p50?: number;
  p10?: number;
};

type SearchParams = {
  s: string;
  e: string;
  m: "daily" | "monthly";
};

const fetchFunction =
  ({
    productId,
    searchParams,
  }: {
    searchParams: SearchParams;
    productId: number;
  }) =>
  async () => {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }${productId}/forecast?${new URLSearchParams(searchParams)}`
    );

    const { p10, p50, p90 }: ForecastType = await res.json();

    const nameFn = (val: string) =>
      searchParams?.m === "monthly"
        ? Months[new Date(val).getMonth()]
        : new Date(val).getDate() + "";

    const result: ForecastChartItem[] = [];

    p10.forEach(({ Timestamp, Value }) => {
      let item = result.find(({ name }) => name === nameFn(Timestamp));
      if (item) item.p10 = Value;
      else result.push({ name: nameFn(Timestamp), p10: Value });
    });

    p50.forEach(({ Timestamp, Value }) => {
      const item = result.find(({ name }) => name === nameFn(Timestamp));
      if (item) item.p50 = Value;
      else result.push({ name: nameFn(Timestamp), p50: Value });
    });

    p90.forEach(({ Timestamp, Value }) => {
      const item = result.find(({ name }) => name === nameFn(Timestamp));
      if (item) item.p90 = Value;
      else result.push({ name: nameFn(Timestamp), p90: Value });
    });

    return result;
  };

const ForecastIn: FC<{ productId: number }> = ({ productId }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    s: "2023-03-01T00:00:00",
    e: "2023-12-01T00:00:00",
    m: "monthly",
  });

  const [range, setRange] = useState<number>(ByMonth);

  const { data, refetch, isError, isLoading, error, isIdle, isRefetching } =
    useQuery({
      queryKey: ["forecast"],
      queryFn: fetchFunction({ searchParams, productId }),
      enabled: Boolean(productId),
    });

  useEffect(() => {
    if (range === ByMonth)
      setSearchParams({
        s: "2023-03-01T00:00:00",
        e: "2023-12-01T00:00:00",
        m: "monthly",
      });
    else {
      const startDate = new Date();
      startDate.setMonth(range + 2);
      startDate.setDate(1);

      const endDate = new Date();
      endDate.setMonth(range + 3);
      endDate.setDate(1);
      endDate.setDate(endDate.getDate() - 1);
      setSearchParams({
        s: startDate.toISOString(),
        e: endDate.toISOString(),
        m: "daily",
      });
    }
  }, [range]);

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  if (isLoading || isIdle) return <Loading />;

  if (isError) {
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

  return (
    <Grid container spacing={2} padding={5} height="100%">
      <Grid item xs={2}>
        <div
          style={{
            marginBottom: "1.5em",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            startIcon={range === ByMonth ? <ArrowForward /> : <Icon />}
            onClick={() => setRange(ByMonth)}
          >
            Monthly
          </Button>
        </div>
        {Months.filter((_, i) => i > new Date().getMonth()).map((month, i) => (
          <div key={`${month}_selector_div`}>
            <Button
              startIcon={range === i ? <ArrowForward /> : <Icon />}
              onClick={() => setRange(i)}
            >
              {month}
            </Button>
          </div>
        ))}
      </Grid>
      <Grid height="100%" item xs={8} sx={{ backgroundColor: grey[100] }}>
        <Box
          sx={{
            display: isRefetching ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1em",
          }}
        >
          <CircularProgress color="secondary" size={20} />
          <Typography marginLeft={3} color="purple">
            Loading new information
          </Typography>
        </Box>
        <ResponsiveContainer>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(val) => currency.format(val / 1000) + "K"} />
            <Tooltip
              formatter={(val) => currency.format((val as number) / 1000) + "K"}
            />
            <Legend
              formatter={(val) => {
                if (val === "p10") return "10th Percentile";
                if (val === "p90") return "90th Percentile";
                return "50th Percentile";
              }}
            />
            <Line
              type="monotone"
              dataKey="p50"
              stroke="#888"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="p10" stroke="orange" />
            <Line type="monotone" dataKey="p90" stroke="green" />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
};

const Forecast: FC<{ productId?: number }> = ({ productId }) => {
  if (productId)
    return (
      <QueryClientProvider client={queryClient}>
        <ForecastIn productId={productId} />
      </QueryClientProvider>
    );

  return <Loading />;
};

export default Forecast;
