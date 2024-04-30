import { Box, Chip, Grid, Paper, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  getVehiclesAverageBehaviourClassInt,
  getVehiclesAverageBehaviourClassIntHistogram,
} from "../../services/opensearch-api.service";
import { useOidcAccessToken } from "@axa-fr/react-oidc";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";

export const GaugeChart = dynamic(
  () =>
    import("../../components/ApexChart").then((module) => module.GaugeChart),
  {
    ssr: false,
  }
);

export const LineChart = dynamic(
  () => import("../../components/ApexChart").then((module) => module.LineChart),
  {
    ssr: false,
  }
);

export interface PeriodicitySelectionProps {
  items: { label: string; value: string }[];
  activeItemValue: string;
  id: string;
  setActiveItemId: (activeItemId: string) => void;
}

export function PeriodicitySelection({
  id = "",
  activeItemValue = "year",
  setActiveItemId = (activeItemValue: string) => {},
  items = [
    { label: "Year", value: "year" },
    { label: "Month", value: "month" },
    { label: "Week", value: "week" },
    { label: "Day", value: "day" },
  ],
}: PeriodicitySelectionProps) {
  return (
    <Box display={"flex"} flexWrap={"wrap"} width={"100%"} gap={2}>
      {items.map((item, index) => (
        <Chip
          key={`periodicity-selection-${id}-${index}`}
          label={item.label}
          variant={activeItemValue === item.value ? "filled" : "outlined"}
          onClick={() => setActiveItemId(item.value)}
          sx={{ color: "primary.light" }}
        />
      ))}
    </Box>
  );
}

export interface ContractStatisticsProps {
  vehiclesVIN: string[];
  from: number;
}

export function ContractStatistics({
  vehiclesVIN,
  from,
}: ContractStatisticsProps) {
  const { accessToken } = useOidcAccessToken();
  const [periodicitySelectionGauge, setPeriodicitySelectionGauge] =
    useState<string>("year");
  const [periodicitySelectionLine, setPeriodicitySelectionLine] =
    useState<string>("year");

  const [lineData, setLineData] = useState<
    {
      key_as_string: string;
      key: number;
      doc_count: number;
      average_driver_behaviour: {
        value: number;
      };
    }[]
  >([]);

  const [gaugeData, setGaugeData] = useState<number | null>(null);

  useEffect(() => {
    if (
      accessToken &&
      vehiclesVIN?.length &&
      from &&
      periodicitySelectionLine
    ) {
      getVehiclesAverageBehaviourClassIntHistogram(accessToken, vehiclesVIN, {
        from,
        interval: periodicitySelectionLine as any,
      }).then(({ buckets }) => {
        setLineData(buckets);
      });
    }
  }, [periodicitySelectionLine, accessToken, vehiclesVIN, from]);

  useEffect(() => {
    if (accessToken && vehiclesVIN?.length && periodicitySelectionGauge) {
      getVehiclesAverageBehaviourClassInt(accessToken, vehiclesVIN, {
        periodicity: periodicitySelectionGauge as any,
      }).then((value) => {
        setGaugeData(value);
      });
    }
  }, [periodicitySelectionGauge, accessToken, vehiclesVIN]);

  return (
    <Grid container item xs={12} spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" gutterBottom>
          Statistics
        </Typography>
      </Grid>
      <Grid container item xs={12} spacing={4}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  component="h2"
                  gutterBottom
                  sx={{ color: "orange.main" }}
                >
                  Driver behaviour score gauge
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <PeriodicitySelection
                  id="gauge"
                  activeItemValue={periodicitySelectionGauge}
                  setActiveItemId={setPeriodicitySelectionGauge}
                  items={[
                    { label: "This Year", value: "year" },
                    { label: "This Month", value: "month" },
                    { label: "This Week", value: "week" },
                    { label: "This Day", value: "day" },
                  ]}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  display={"flex"}
                  minHeight={"45vh"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  gap={2}
                >
                  {gaugeData ? (
                    <GaugeChart
                      series={[Math.ceil(gaugeData)]}
                      width={"100%"}
                      options={{
                        labels:
                          gaugeData > 20 && gaugeData < 40
                            ? ["Poor driver"]
                            : gaugeData >= 40 && gaugeData < 50
                            ? ["Average driver"]
                            : gaugeData >= 50
                            ? ["Good driver"]
                            : ["Dangerous driver"],
                        chart: {
                          height: 350,
                          type: "radialBar",
                          offsetY: -10,
                        },
                        plotOptions: {
                          radialBar: {
                            startAngle: -135,
                            endAngle: 135,
                            dataLabels: {
                              name: {
                                fontSize: "16px",
                                color:
                                  gaugeData > 20 && gaugeData < 40
                                    ? "##ff9800"
                                    : gaugeData >= 40 && gaugeData < 50
                                    ? "#085FCE"
                                    : gaugeData >= 50
                                    ? "#085FCE"
                                    : "#ef5350",
                                offsetY: 120,
                              },
                              value: {
                                offsetY: 76,
                                fontSize: "22px",
                                color:
                                  gaugeData > 20 && gaugeData < 40
                                    ? "##ff9800"
                                    : gaugeData >= 40 && gaugeData < 50
                                    ? "#085FCE"
                                    : gaugeData >= 50
                                    ? "#085FCE"
                                    : "#ef5350",
                                formatter: function (val) {
                                  return val + "%";
                                },
                              },
                            },
                          },
                        },
                        fill: {
                          colors:
                            gaugeData > 20 && gaugeData < 40
                              ? ["##ff9800"]
                              : gaugeData >= 40 && gaugeData < 50
                              ? ["#085FCE"]
                              : gaugeData >= 50
                              ? ["#085FCE"]
                              : ["#ef5350"],
                          type: "gradient",
                          gradient: {
                            shade: "dark",
                            shadeIntensity: 0.15,
                            inverseColors: false,
                            opacityFrom: 1,
                            opacityTo: 1,
                            stops: [0, 50, 65, 91],
                          },
                        },
                        stroke: {
                          dashArray: 4,
                        },
                      }}
                    />
                  ) : (
                    <>
                      <QueryStatsOutlinedIcon sx={{ fontSize: "3rem" }} />
                      <Typography variant="h6">No data</Typography>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  component="h2"
                  gutterBottom
                  sx={{ color: "orange.main" }}
                >
                  Driver behaviour score evolution
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
                      data: lineData.map(
                        ({ average_driver_behaviour: { value } }) => value || 0
                      ),
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
