import { Grid, Paper, Typography } from "@mui/material";
import { MetricPanel } from "../../components/MetricPanel";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
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
import { getVehiclesAverageBehaviourClassInt } from "../../services/opensearch-api.service";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import dynamic from "next/dynamic";
import { Vehicle } from "../../lib/vehicle.interface";

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

  const [periodicitySelectionGauge, setPeriodicitySelectionGauge] =
    useState<string>("year");
  const [gaugeData, setGaugeData] = useState<number | null>(null);

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
            Behaviour score gauge (current year)
          </Typography>
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
              <SpeedOutlinedIcon sx={{ fontSize: "5rem" }} />
              <Typography component={"p"} variant="button">
                Nothing just yet.
              </Typography>
            </>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} lg={6} container spacing={4} alignItems="flex-start">
        <Grid item xs={12} lg={12}>
          <MetricPanel
            label="Pending subscriptions"
            value={pendingSubscriptionApplicationsCount.toFixed(1)}
            href="/applications?status=PENDING"
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
