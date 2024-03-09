import { Grid, Paper, Typography } from "@mui/material";
import dynamic from "next/dynamic";

export const LineChart = dynamic(
  () => import("../../components/ApexChart").then((module) => module.LineChart),
  {
    ssr: false,
  }
);

export function RevenueChart() {
  return (
    <Grid container item xs={12} spacing={4} alignItems="flex-start">
      <Grid container item xs={12} spacing={4} alignItems="flex-start">
        <Grid item xs={12}>
          <Typography variant="h6" component="h2" gutterBottom>
            Revenue / month
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 4 }}>
            <LineChart />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
