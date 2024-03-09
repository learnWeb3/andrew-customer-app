import { Grid } from "@mui/material";
import { MetricPanel } from "../../components/MetricPanel";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";

export function BusinessMetrics() {
  return (
    <Grid container item xs={12} spacing={4} alignItems="flex-start">
      <Grid item xs={6} lg={6}>
        <MetricPanel
          label="Revenue"
          icon={
            <AccountBalanceOutlinedIcon
              color="inherit"
              sx={{
                width: "2.5rem",
                height: "2.5rem",
              }}
            />
          }
        />
      </Grid>
      <Grid item xs={6} lg={6}>
        <MetricPanel
          label="Active devices"
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
      <Grid item xs={6} lg={6}>
        <MetricPanel
          label="Active contracts"
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
      <Grid item xs={6} lg={6}>
        <MetricPanel
          label="Active users"
          icon={
            <PeopleOutlineOutlinedIcon
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
  );
}
