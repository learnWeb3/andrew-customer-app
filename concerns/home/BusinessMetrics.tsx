import { Box, Grid, Paper, Typography } from "@mui/material";
import { MetricPanel } from "../../components/MetricPanel";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { useEffect, useState } from "react";
import {
  getPendingSubscriptionCount,
  listContracts,
  listDevices,
  listVehicles,
} from "../../services/andrew-api.service";
import { DeviceStatus } from "../../lib/device-status.enum";
import { ContractStatus } from "../../lib/contract-status.enum";
import {
  getVehiclesAverageBehaviourClassInt,
  getVehiclesAverageDrivingTime,
} from "../../services/opensearch-api.service";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import dynamic from "next/dynamic";
import { Vehicle } from "../../lib/vehicle.interface";
import { getDuration } from "../../services/date-formatter.service";
import DriveEtaOutlinedIcon from "@mui/icons-material/DriveEtaOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";

export const GaugeChart = dynamic(
  () =>
    import("../../components/ApexChart").then((module) => module.GaugeChart),
  {
    ssr: false,
  }
);

export function BusinessMetrics() {
  const { accessToken } = useOidcAccessToken();

  const [
    pendingSubscriptionApplicationsCount,
    setPendingSubscriptionApplicationsCount,
  ] = useState<number>(0);

  const [pairedDevicesCount, setPairedDevicesCount] = useState<number>(0);
  const [activeContractsCount, setActiveContractsCount] = useState<number>(0);
  const [vehiclesVIN, setVehiclesVIN] = useState<string[]>([]);

  useEffect(() => {
    if (accessToken) {
      getPendingSubscriptionCount(accessToken).then((count) =>
        setPendingSubscriptionApplicationsCount(count)
      );
      listDevices(accessToken, DeviceStatus.PAIRED, {
        start: 0,
        limit: 1,
      }).then(({ count }) => setPairedDevicesCount(count));
      listContracts(accessToken, ContractStatus.ACTIVE, {
        start: 0,
        limit: 1,
      }).then(({ count }) => setActiveContractsCount(count));
      listVehicles(accessToken, {
        start: 0,
        limit: Number.MAX_SAFE_INTEGER,
      }).then((data) => {
        setVehiclesVIN(data.results.map((vehicle: Vehicle) => vehicle.vin));
      });
    }
  }, [accessToken]);

  const yearPeriodicitySelectionGauge = "year";
  const weekPeriodicitySelectionGauge = "week";
  const dayPeriodicitySelectionGauge = "day";

  const [yearVehiclesDrivingSum, setYearVehiclesDrivingSum] = useState<
    number | null
  >(null);
  const [weekVehiclesDrivingSum, setWeekVehiclesDrivingSum] = useState<
    number | null
  >(null);

  const [dayVehiclesDrivingSum, setDayVehiclesDrivingSum] = useState<
    number | null
  >(null);

  const [yearGaugeData, setYearGaugeData] = useState<number | null>(null);
  const [weekGaugeData, setWeekGaugeData] = useState<number | null>(null);
  const [dayGaugeData, setDayGaugeData] = useState<number | null>(null);

  useEffect(() => {
    if (accessToken && vehiclesVIN?.length && yearPeriodicitySelectionGauge) {
      getVehiclesAverageBehaviourClassInt(accessToken, vehiclesVIN, {
        periodicity: yearPeriodicitySelectionGauge as any,
      }).then((value) => {
        setYearGaugeData(value);
      });
      getVehiclesAverageDrivingTime(accessToken, vehiclesVIN, {
        periodicity: yearPeriodicitySelectionGauge as any,
      }).then((value) => {
        setYearVehiclesDrivingSum(value);
      });
    }
  }, [yearPeriodicitySelectionGauge, accessToken, vehiclesVIN]);

  useEffect(() => {
    if (accessToken && vehiclesVIN?.length && weekPeriodicitySelectionGauge) {
      getVehiclesAverageBehaviourClassInt(accessToken, vehiclesVIN, {
        periodicity: weekPeriodicitySelectionGauge as any,
      }).then((value) => {
        setWeekGaugeData(value);
      });
      getVehiclesAverageDrivingTime(accessToken, vehiclesVIN, {
        periodicity: weekPeriodicitySelectionGauge as any,
      }).then((value) => {
        setWeekVehiclesDrivingSum(value);
      });
    }
  }, [weekPeriodicitySelectionGauge, accessToken, vehiclesVIN]);

  useEffect(() => {
    if (accessToken && vehiclesVIN?.length && dayPeriodicitySelectionGauge) {
      getVehiclesAverageBehaviourClassInt(accessToken, vehiclesVIN, {
        periodicity: dayPeriodicitySelectionGauge as any,
      }).then((value) => {
        setDayGaugeData(value);
      });
      getVehiclesAverageDrivingTime(accessToken, vehiclesVIN, {
        periodicity: dayPeriodicitySelectionGauge as any,
      }).then((value) => {
        setDayVehiclesDrivingSum(value);
      });
    }
  }, [dayPeriodicitySelectionGauge, accessToken, vehiclesVIN]);

  return (
    <Grid container item xs={12} spacing={4} alignItems="center" mb={4}>
      <Grid
        item
        xs={12}
        lg={6}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Paper
          sx={{
            p: 4,
            height: "75vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            gap: 2,
            position: "relative",
          }}
        >
          <Typography
            variant="subtitle1"
            component="p"
            sx={{
              color: "orange.main",
              width: "100%",
              textAlign: "left",
              position: "absolute",
              top: "2rem",
              left: "2rem",
            }}
          >
            Behaviour score gauge (current day)
          </Typography>
          {dayGaugeData ? (
            <GaugeChart
              series={[Math.ceil(dayGaugeData)]}
              width={"100%"}
              options={{
                labels:
                  dayGaugeData > 20 && dayGaugeData < 40
                    ? ["Poor driver"]
                    : dayGaugeData >= 40 && dayGaugeData < 50
                    ? ["Average driver"]
                    : dayGaugeData >= 50
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
                          dayGaugeData > 20 && dayGaugeData < 40
                            ? "##ff9800"
                            : dayGaugeData >= 40 && dayGaugeData < 50
                            ? "#085FCE"
                            : dayGaugeData >= 50
                            ? "#085FCE"
                            : "#ef5350",
                        offsetY: 120,
                      },
                      value: {
                        offsetY: 76,
                        fontSize: "22px",
                        color:
                          dayGaugeData > 20 && dayGaugeData < 40
                            ? "##ff9800"
                            : dayGaugeData >= 40 && dayGaugeData < 50
                            ? "#085FCE"
                            : dayGaugeData >= 50
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
                    dayGaugeData > 20 && dayGaugeData < 40
                      ? ["##ff9800"]
                      : dayGaugeData >= 40 && dayGaugeData < 50
                      ? ["#085FCE"]
                      : dayGaugeData >= 50
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
              <SpeedOutlinedIcon sx={{ fontSize: "5rem" }} />
              <Typography component={"p"} variant="button">
                Nothing just yet.
              </Typography>
            </>
          )}
        </Paper>
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Paper
          sx={{
            p: 4,
            height: "75vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            gap: 2,
            position: "relative",
          }}
        >
          <Typography
            variant="subtitle1"
            component="p"
            sx={{
              color: "orange.main",
              width: "100%",
              textAlign: "left",
              position: "absolute",
              top: "2rem",
              left: "2rem",
            }}
          >
            Driving time (current day)
          </Typography>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Box>
              <DriveEtaOutlinedIcon
                sx={{ color: "primary.light", fontSize: "4rem" }}
              />
              <WatchLaterOutlinedIcon
                sx={{ color: "primary.light", fontSize: "2rem" }}
              />
            </Box>
            <Typography
              variant="subtitle1"
              sx={{ color: "primary.light" }}
              fontWeight={"bold"}
            >
              {dayVehiclesDrivingSum
                ? getDuration(
                    dayVehiclesDrivingSum as number,
                    "millisecond",
                    "humanize"
                  )
                : getDuration(0 as number, "millisecond", "humanize")}
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Paper
          sx={{
            p: 4,
            height: "75vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            gap: 2,
            position: "relative",
          }}
        >
          <Typography
            variant="subtitle1"
            component="p"
            sx={{
              color: "orange.main",
              width: "100%",
              textAlign: "left",
              position: "absolute",
              top: "2rem",
              left: "2rem",
            }}
          >
            Behaviour score gauge (current week)
          </Typography>
          {weekGaugeData ? (
            <GaugeChart
              series={[Math.ceil(weekGaugeData)]}
              width={"100%"}
              options={{
                labels:
                  weekGaugeData > 20 && weekGaugeData < 40
                    ? ["Poor driver"]
                    : weekGaugeData >= 40 && weekGaugeData < 50
                    ? ["Average driver"]
                    : weekGaugeData >= 50
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
                          weekGaugeData > 20 && weekGaugeData < 40
                            ? "##ff9800"
                            : weekGaugeData >= 40 && weekGaugeData < 50
                            ? "#085FCE"
                            : weekGaugeData >= 50
                            ? "#085FCE"
                            : "#ef5350",
                        offsetY: 120,
                      },
                      value: {
                        offsetY: 76,
                        fontSize: "22px",
                        color:
                          weekGaugeData > 20 && weekGaugeData < 40
                            ? "##ff9800"
                            : weekGaugeData >= 40 && weekGaugeData < 50
                            ? "#085FCE"
                            : weekGaugeData >= 50
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
                    weekGaugeData > 20 && weekGaugeData < 40
                      ? ["##ff9800"]
                      : weekGaugeData >= 40 && weekGaugeData < 50
                      ? ["#085FCE"]
                      : weekGaugeData >= 50
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
              <SpeedOutlinedIcon sx={{ fontSize: "5rem" }} />
              <Typography component={"p"} variant="button">
                Nothing just yet.
              </Typography>
            </>
          )}
        </Paper>
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Paper
          sx={{
            p: 4,
            height: "75vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            gap: 2,
            position: "relative",
          }}
        >
          <Typography
            variant="subtitle1"
            component="p"
            sx={{
              color: "orange.main",
              width: "100%",
              textAlign: "left",
              position: "absolute",
              top: "2rem",
              left: "2rem",
            }}
          >
            Driving time (current week)
          </Typography>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Box>
              <DriveEtaOutlinedIcon
                sx={{ color: "primary.light", fontSize: "4rem" }}
              />
              <WatchLaterOutlinedIcon
                sx={{ color: "primary.light", fontSize: "2rem" }}
              />
            </Box>
            <Typography
              variant="subtitle1"
              sx={{ color: "primary.light" }}
              fontWeight={"bold"}
            >
              {weekVehiclesDrivingSum
                ? getDuration(
                    weekVehiclesDrivingSum as number,
                    "millisecond",
                    "humanize"
                  )
                : getDuration(0 as number, "millisecond", "humanize")}
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Paper
          sx={{
            p: 4,
            height: "75vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            gap: 2,
            position: "relative",
          }}
        >
          <Typography
            variant="subtitle1"
            component="p"
            sx={{
              color: "orange.main",
              width: "100%",
              textAlign: "left",
              position: "absolute",
              top: "2rem",
              left: "2rem",
            }}
          >
            Behaviour score gauge (current year)
          </Typography>
          {yearGaugeData ? (
            <GaugeChart
              series={[Math.ceil(yearGaugeData)]}
              width={"100%"}
              options={{
                labels:
                  yearGaugeData > 20 && yearGaugeData < 40
                    ? ["Poor driver"]
                    : yearGaugeData >= 40 && yearGaugeData < 50
                    ? ["Average driver"]
                    : yearGaugeData >= 50
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
                          yearGaugeData > 20 && yearGaugeData < 40
                            ? "##ff9800"
                            : yearGaugeData >= 40 && yearGaugeData < 50
                            ? "#085FCE"
                            : yearGaugeData >= 50
                            ? "#085FCE"
                            : "#ef5350",
                        offsetY: 120,
                      },
                      value: {
                        offsetY: 76,
                        fontSize: "22px",
                        color:
                          yearGaugeData > 20 && yearGaugeData < 40
                            ? "##ff9800"
                            : yearGaugeData >= 40 && yearGaugeData < 50
                            ? "#085FCE"
                            : yearGaugeData >= 50
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
                    yearGaugeData > 20 && yearGaugeData < 40
                      ? ["##ff9800"]
                      : yearGaugeData >= 40 && yearGaugeData < 50
                      ? ["#085FCE"]
                      : yearGaugeData >= 50
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
              <SpeedOutlinedIcon sx={{ fontSize: "5rem" }} />
              <Typography component={"p"} variant="button">
                Nothing just yet.
              </Typography>
            </>
          )}
        </Paper>
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Paper
          sx={{
            p: 4,
            height: "75vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            gap: 2,
            position: "relative",
          }}
        >
          <Typography
            variant="subtitle1"
            component="p"
            sx={{
              color: "orange.main",
              width: "100%",
              textAlign: "left",
              position: "absolute",
              top: "2rem",
              left: "2rem",
            }}
          >
            Driving time (current year)
          </Typography>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Box>
              <DriveEtaOutlinedIcon
                sx={{ color: "primary.light", fontSize: "4rem" }}
              />
              <WatchLaterOutlinedIcon
                sx={{ color: "primary.light", fontSize: "2rem" }}
              />
            </Box>
            <Typography
              variant="subtitle1"
              sx={{ color: "primary.light" }}
              fontWeight={"bold"}
            >
              {yearVehiclesDrivingSum
                ? getDuration(
                    yearVehiclesDrivingSum as number,
                    "millisecond",
                    "humanize"
                  )
                : getDuration(0 as number, "millisecond", "humanize")}
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} lg={12} container spacing={4} alignItems="flex-start">
        <Grid item xs={12} lg={12}>
          <MetricPanel
            label="Pending subscriptions"
            value={pendingSubscriptionApplicationsCount.toFixed(1)}
            href="/applications?status=PENDING"
            icon={
              <FolderOutlinedIcon
                color="inherit"
                sx={{
                  width: "2.5rem",
                  height: "2.5rem",
                }}
              />
            }
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <MetricPanel
            label="Paired devices"
            value={pairedDevicesCount.toFixed(1)}
            href="/devices?status=PAIRED"
            icon={
              <DevicesOutlinedIcon
                color="inherit"
                sx={{
                  width: "2.5rem",
                  height: "2.5rem",
                }}
              />
            }
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <MetricPanel
            label="Active contracts"
            value={activeContractsCount.toFixed(1)}
            href="/contracts?status=ACTIVE"
            icon={
              <DescriptionOutlinedIcon
                color="inherit"
                sx={{
                  width: "2.5rem",
                  height: "2.5rem",
                }}
              />
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
