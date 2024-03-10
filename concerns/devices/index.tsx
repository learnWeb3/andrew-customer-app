import { Grid, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/Datatable";
import { SearchBar } from "../../components/SearchBar";
import { DeviceStatus } from "../../lib/device-status.enum";
import { RenderCellDate } from "../../components/Datatable/RenderCellDate";
import { RenderCellLink } from "../../components/Datatable/RenderCellLink";
import { RenderCellDeviceSatus } from "../../components/Datatable/RenderCellStatus";
import { useToggledState } from "../../hooks/useToggledState";
import { useEffect, useState } from "react";
import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { PaginatedResults } from "../../lib/paginated-results.interface";
import { listDevices } from "../../services/andrew-api.service";
import { Device } from "../../lib/device.interface";
import { usePagination } from "../../hooks/usePagination";
import { useDebounce } from "../../hooks/useDebounce";
import { DeviceStatusFilters } from "./DeviceStatusFilters";
import { useRouter } from "next/router";

export interface DevicesConcernProps {
  initialSearchFiltersStatus?: DeviceStatus;
}

export function DevicesConcern({
  initialSearchFiltersStatus = DeviceStatus.PAIRED,
}: DevicesConcernProps) {
  const columns: GridColDef[] = [
    {
      field: "ref",
      headerName: "Ref",
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

  const router = useRouter();

  const { toggled, open, close } = useToggledState(false);

  const [searchFilters, setSearchFilters] = useState<{
    status: DeviceStatus;
  }>({
    status: initialSearchFiltersStatus,
  });

  const { accessToken } = useOidcAccessToken();

  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 400);

  const [devices, setDevices] = useState<
    PaginatedResults<{
      id: string;
      ref: {
        label: string;
        href: string;
      };
      status: DeviceStatus;
      vehicle: {
        label: string;
        href: string;
      };
      createdAt: string;
    }>
  >({
    count: 0,
    results: [],
    limit: 10,
    start: 0,
  });

  const { pagination, setPagination } = usePagination(10, 1);

  useEffect(() => {
    if (accessToken && pagination) {
      listDevices(
        accessToken,
        searchFilters.status,
        {
          start: (pagination.page - 1) * pagination.pageSize,
          limit: pagination.pageSize,
        },
        {
          value: debouncedSearchValue,
        }
      ).then((data) => {
        setDevices({
          ...data,
          results: data.results.map((device: Device) => ({
            id: device._id,
            ref: {
              label: device.serialNumber,
              href: `/devices/${device._id}`,
            },
            status: device.status,
            vehicle: device?.vehicle
              ? {
                  label: device.vehicle.vin,
                  href: `/vehicles/${device.vehicle._id}`,
                }
              : {
                  label: "No vehicle attached",
                  href: null,
                },
            createdAt: device.createdAt,
          })),
        });
      });
    }
  }, [accessToken, pagination, debouncedSearchValue, searchFilters]);
  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <Typography variant="h4" component="h2" gutterBottom>
          Devices
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <SearchBar
          label="Search devices by reference"
          value={searchValue}
          setValue={setSearchValue}
        />
        <DeviceStatusFilters
          selectedDeviceStatus={searchFilters.status}
          setSelectedDeviceStatus={(status) =>
            setSearchFilters({
              ...searchFilters,
              status,
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <DataTable
          count={devices.count}
          start={devices.start}
          limit={devices.limit}
          rows={devices.results}
          columns={columns}
          onPaginationChange={(newPagination) => {
            setPagination(newPagination);
          }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
        />
      </Grid>
    </Grid>
  );
}
