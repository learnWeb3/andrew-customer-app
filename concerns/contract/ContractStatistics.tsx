import { Grid, Paper, Typography } from "@mui/material";
import dynamic from "next/dynamic";

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

export function ContractStatistics() {
  return (
    <Grid container item xs={12} spacing={4} alignItems="flex-start">
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" gutterBottom>
          Statistics
        </Typography>
      </Grid>
      <Grid container item xs={12} spacing={4} alignItems="flex-start">
        <Grid container spacing={4} item xs={12} lg={6} alignItems="flex-start">
          <Grid item xs={12}>
            <Typography variant="h6" component="h2" gutterBottom>
              Driver behaviour class
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Paper sx={{ p: 4 }}>
              <GaugeChart />
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2" gutterBottom>
              Driver behaviour / month
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 4 }}>
              <LineChart />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
