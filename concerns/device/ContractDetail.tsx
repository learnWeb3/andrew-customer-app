import { Grid, Typography, Link as MUILink } from "@mui/material";
import Link from "next/link";

export function ContractDetail() {
  return (
    <Grid container item xs={12} spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h6" component="h2" gutterBottom>
          Contract
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <MUILink variant="h6">
          <Link href={""}>110077889910</Link>
        </MUILink>
      </Grid>
    </Grid>
  );
}
