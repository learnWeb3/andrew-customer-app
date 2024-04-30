import { Grid, Typography } from "@mui/material";
import DataTable from "../../components/Datatable";
import { RenderCellLink } from "../../components/Datatable/RenderCellLink";
import { RenderCellBehaviourClassSatus } from "../../components/Datatable/RenderCellStatus";
import { GridColDef } from "@mui/x-data-grid";
import { RenderCellDate } from "../../components/Datatable/RenderCellDate";
import { useEffect, useState } from "react";
import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { PaginatedResults } from "../../lib/paginated-results.interface";
import { getVehiclesMetricsReports } from "../../services/opensearch-api.service";
import { usePagination } from "../../hooks/usePagination";

export interface MetricsReportsDetailProps {
  vehiclesVIN: string[];
}
export function MetricsReportsDetail({
  vehiclesVIN,
}: MetricsReportsDetailProps) {
  const columns: GridColDef[] = [
    {
      field: "vehicle",
      headerName: "Vehicle",
      flex: 1.5,
    },
    {
      field: "device",
      headerName: "Device",
      flex: 1,
      renderCell: RenderCellLink,
    },
    {
      field: "start",
      headerName: "Driving session start",
      flex: 1.5,
      renderCell: RenderCellDate,
    },
    {
      field: "end",
      headerName: "Driving session end",
      flex: 1.5,
      renderCell: RenderCellDate,
    },
    {
      field: "driverBehaviourClass",
      headerName: "Driver behaviour class",
      flex: 1.5,
      align: "center",
      headerAlign: "center",
      renderCell: RenderCellBehaviourClassSatus,
    },
  ];

  const { accessToken } = useOidcAccessToken();
  const [metricsReports, setMetricsReports] = useState<
    PaginatedResults<{
      id: string;
      vehicle: string;
      device: {
        label: string;
        href: string;
      };
      start: string;
      end: string;
      driverBehaviourClass: string;
    }>
  >({
    start: 0,
    limit: 10,
    count: 0,
    results: [],
  });

  const { pagination, setPagination } = usePagination(10, 1);

  useEffect(() => {
    if (vehiclesVIN?.length && accessToken) {
      getVehiclesMetricsReports(
        accessToken,
        vehiclesVIN,
        (pagination.page - 1) * pagination.pageSize,
        pagination.pageSize
      ).then((data) => {
        const _metricsReports = data.results.map(
          ({ _id, vehicle, device, report }) => ({
            id: _id,
            vehicle: vehicle,
            device: {
              label: "See device",
              href: `/devices/${device}`,
            },
            start: new Date(report.driving_session.start).toISOString(),
            end: new Date(report.driving_session.end).toISOString(),
            driverBehaviourClass: report.driving_session.driver_behaviour_class,
          })
        );

        setMetricsReports({
          results: _metricsReports,
          start: data.start,
          limit: data.limit,
          count: data.count,
        });
      });
    }
  }, [vehiclesVIN, accessToken, pagination]);

  return (
    <Grid container item xs={12} spacing={4} alignItems="flex-start">
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" gutterBottom>
          Metrics reports
        </Typography>
      </Grid>
      <Grid container item xs={12} spacing={4} alignItems="flex-start">
        <Grid item xs={12}>
          <DataTable
            rows={metricsReports?.results || []}
            columns={columns}
            count={metricsReports.count}
            start={metricsReports.start}
            limit={metricsReports.limit}
            onPaginationChange={(newPagination) => {
              setPagination(newPagination);
            }}
            pageSizeOptions={[5, 10, 25, 50, 100]}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
