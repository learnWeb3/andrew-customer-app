import { Grid, Typography } from "@mui/material";
import { SearchBar } from "../../components/SearchBar";
import DataTable from "../../components/Datatable";
import { DeviceStatus } from "../../lib/device-status.enum";
import { RenderCellLink } from "../../components/Datatable/RenderCellLink";
import { RenderCellDeviceSatus } from "../../components/Datatable/RenderCellStatus";
import { GridColDef } from "@mui/x-data-grid";
import { RenderCellDuration } from "../../components/Datatable/RenderCellDuration";
import { RenderCellDate } from "../../components/Datatable/RenderCellDate";
import { useEffect, useState } from "react";
import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { findContractDevices } from "../../services/andrew-api.service";
import { PaginatedResults } from "../../lib/paginated-results.interface";

export interface DevicesDetailProps {
  contract: string;
}
export function DevicesDetail({ contract }: DevicesDetailProps) {
  const columns: GridColDef[] = [
    {
      field: "serialNumber",
      headerName: "Serial number",
      flex: 1.5,
      renderCell: RenderCellLink,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: RenderCellDeviceSatus,
    },
    {
      field: "vehicle",
      headerName: "Vehicle",
      flex: 1.5,
      renderCell: RenderCellLink,
    },
    {
      field: "createdAt",
      headerName: "Created at",
      flex: 1,
      renderCell: RenderCellDate,
    },
  ];

  const { accessToken } = useOidcAccessToken();
  const [devices, setDevices] = useState<PaginatedResults<any>>({
    start: 0,
    limit: 10,
    count: 0,
    results: [],
  });
  useEffect(() => {
    if (contract && accessToken) {
      findContractDevices(contract, accessToken).then((data) => {
        // console.log(data);
        setDevices({
          ...data,
          results: data.results.map((device) => ({
            id: device._id,
            serialNumber: {
              label: device.serialNumber,
              href: `/devices/${device._id}`,
            },
            status: device.status,
            vehicle: {
              label: device.vehicle.vin,
              href: `/vehicles/${device.vehicle.vin}`,
            },
          })),
        });
      });
    }
  }, [contract, accessToken]);

  return (
    <Grid container item xs={12} spacing={4} alignItems="flex-start">
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" gutterBottom>
          Devices
        </Typography>
      </Grid>
      <Grid container item xs={12} spacing={4} alignItems="flex-start">
        <Grid item xs={12}>
          <DataTable
            rows={devices?.results || []}
            columns={columns}
            count={devices.count}
            start={devices.start}
            limit={devices.limit}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
