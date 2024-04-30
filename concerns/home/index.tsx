import { Button, Grid, Typography } from "@mui/material";
import { BusinessMetrics } from "./BusinessMetrics";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import { useRouter } from "next/router";

export function HomeConcern() {
  const router = useRouter();
  return (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item xs={8}>
        <Typography variant="h6" component="h2" gutterBottom>
          Dashboard
        </Typography>
      </Grid>
      <Grid
        item
        xs={4}
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
        <Button
          onClick={() => router.push("/applications")}
          variant="contained"
          size="small"
          endIcon={<ArrowRightAltOutlinedIcon />}
        >
          Subscription applications
        </Button>
      </Grid>
      <Grid item xs={12}>
        <BusinessMetrics />
      </Grid>
    </Grid>
  );
}
