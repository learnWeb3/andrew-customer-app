import { Grid, Typography } from "@mui/material";

export function HomeConcern() {
  return (
    <Grid container spacing={4} alignItems="flex-start">
      <Grid item xs={6}>
        <Typography variant="h4" component="h2" gutterBottom>
          Dashboard
        </Typography>
      </Grid>
    </Grid>
  );
}
