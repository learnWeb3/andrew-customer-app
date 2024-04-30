import { Grid, Paper, Typography, Box, Hidden } from "@mui/material";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import Link from "next/link";

export function MetricPanel({
  label = "Revenue to date",
  value = "251K",
  icon = (
    <PeopleOutlineOutlinedIcon
      color="inherit"
      sx={{
        width: "2.25rem",
        height: "2.25rem",
      }}
    />
  ),
  href = "/",
}) {
  return (
    <Paper sx={{ p: 4 }}>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid
          item
          xs={12}
          lg={8}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: { xs: "center", lg: "flex-start" },
            gap: 2,
          }}
        >
          <Hidden lgDown>
            <Typography
              variant="subtitle1"
              component="p"
              sx={{ color: "orange.main" }}
            >
              {label}
            </Typography>
          </Hidden>
          <Typography variant="h4" component="p" sx={{ color: "orange.main" }}>
            {value}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
            color: "primary.light",
          }}
        >
          {icon}
          <Link href={href}>
            <Typography
              variant="button"
              component="p"
              sx={{ color: "primary" }}
            >
              see more
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
}
