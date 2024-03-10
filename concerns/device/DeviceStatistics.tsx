import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { Grid, Paper, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getVehiclesDataPointCountHistogram } from "../../services/opensearch-api.service";
import { PeriodicitySelection } from "../contract/ContractStatistics";

export const LineChart = dynamic(
  () => import("../../components/ApexChart").then((module) => module.LineChart),
  {
    ssr: false,
  }
);

export interface DeviceStatisticsProps {
  vehiclesVIN: string[];
  from: number;
}

export function DeviceStatistics({ vehiclesVIN, from }: DeviceStatisticsProps) {
  const { accessToken } = useOidcAccessToken();
  const [periodicitySelectionLine, setPeriodicitySelectionLine] =
    useState<string>("year");

  const [lineData, setLineData] = useState<
    {
      key_as_string: string;
      key: number;
      doc_count: number;
      count: {
        value: number;
      };
    }[]
  >([]);

  useEffect(() => {
    if (accessToken && vehiclesVIN && from && periodicitySelectionLine) {
      getVehiclesDataPointCountHistogram(accessToken, vehiclesVIN, {
        from,
        interval: periodicitySelectionLine as any,
      }).then((value) => {
        setLineData(value);
      });
    }
  }, [periodicitySelectionLine, accessToken, vehiclesVIN, from]);

  return (
    <Grid container item xs={12} spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h6" component="h2" gutterBottom>
          Statistics
        </Typography>
      </Grid>
      <Grid container item xs={12} spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2" gutterBottom>
            Device collected data
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1" component="h2" gutterBottom>
                  Device collected data
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <PeriodicitySelection
                  id="line"
                  activeItemValue={periodicitySelectionLine}
                  setActiveItemId={setPeriodicitySelectionLine}
                  items={[
                    { label: "Year", value: "year" },
                    { label: "Month", value: "month" },
                    { label: "Week", value: "week" },
                    { label: "Day", value: "day" },
                  ]}
                />
              </Grid>
              <Grid item xs={12}>
                <LineChart
                  series={[
                    {
                      name: "",
                      data: lineData.map(({ count: { value } }) => value || 0),
                    },
                  ]}
                  options={{
                    chart: {
                      height: "100%",
                      type: "line",
                      dropShadow: {
                        enabled: true,
                        color: "#000",
                        top: 18,
                        left: 7,
                        blur: 10,
                        opacity: 0.2,
                      },
                      toolbar: {
                        show: false,
                      },
                    },
                    colors: ["#04103B"],
                    dataLabels: {
                      enabled: true,
                    },
                    stroke: {
                      curve: "smooth",
                    },
                    grid: {
                      borderColor: "#e7e7e7",
                      row: {
                        colors: ["#f3f3f3", "transparent"],
                        opacity: 0.5,
                      },
                    },
                    markers: {
                      size: 1,
                    },
                    xaxis: {
                      categories: lineData.map(
                        ({ key_as_string }) => key_as_string
                      ),
                      title: {
                        text: periodicitySelectionLine,
                      },
                    },
                    yaxis: {
                      title: {
                        text: "Behaviour score",
                      },
                      min: 5,
                      max: 40,
                    },
                    legend: {
                      position: "top",
                      horizontalAlign: "right",
                      floating: true,
                      offsetY: -25,
                      offsetX: -5,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
