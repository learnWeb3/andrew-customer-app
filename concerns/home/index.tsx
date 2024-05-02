import { Grid, Typography } from "@mui/material";
import { BusinessMetrics } from "./BusinessMetrics";
import { useRouter } from "next/router";

export function HomeConcern() {
  const router = useRouter();
  return (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item xs={12}>
        <Typography variant="h6" component="h2" gutterBottom>
          Dashboard
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <BusinessMetrics />
      </Grid>
    </Grid>
  );
}
