import { Box, Grid, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/Datatable";
import { SearchBar } from "../../components/SearchBar";
import { RenderCellLink } from "../../components/Datatable/RenderCellLink";
import { RenderCellContractSatus } from "../../components/Datatable/RenderCellStatus";
import { RenderCellDate } from "../../components/Datatable/RenderCellDate";
import { ContractStatus } from "../../lib/contract-status.enum";
import { PaginatedResults } from "../../lib/paginated-results.interface";
import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { useEffect, useState } from "react";
import { listContracts } from "../../services/andrew-api.service";
import { Contract } from "../../lib/contract.interface";
import { ContractStatusFilters } from "./ContractStatusFilters";
import { usePagination } from "../../hooks/usePagination";
import { useDebounce } from "../../hooks/useDebounce";
import { useRouter } from "next/router";

export interface ContractsConcernProps {
  searchFilters: {
    status: ContractStatus;
  };
  setSearchFilters: (searchFilters: { status: ContractStatus }) => void;
}

export function ContractsConcern({
  searchFilters = { status: ContractStatus.ACTIVE },
  setSearchFilters = (newFilters) => {},
}: ContractsConcernProps) {
  const columns: GridColDef[] = [
    {
      field: "ref",
      headerName: "Ref",
      flex: 2,
      renderCell: RenderCellLink,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: RenderCellContractSatus,
    },
    {
      field: "vehicle",
      headerName: "Vehicle count",
      flex: 1.5,
      renderCell: RenderCellLink,
    },
    {
      field: "paymentDueDate",
      headerName: "Payment due date",
      flex: 1,
      renderCell: RenderCellDate,
    },
    {
      field: "createdAt",
      headerName: "Created at",
      flex: 1,
      renderCell: RenderCellDate,
    },
  ];

  const router = useRouter();
  const { accessToken } = useOidcAccessToken();
  const [contracts, setContracts] = useState<PaginatedResults<Contract>>({
    count: 0,
    results: [],
    limit: 10,
    start: 0,
  });

  const { pagination, setPagination } = usePagination(10, 1);

  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 400);

  useEffect(() => {
    if (accessToken && pagination) {
      listContracts(
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
        setContracts({
          ...data,
          results: data.results.map((contract: Contract) => ({
            id: contract._id,
            ref: {
              label: contract.ref,
              href: `/contracts/${contract._id}`,
            },
            status: contract.status,
            vehicle: {
              label: contract.vehicles?.[0]?.count || 0,
              href: `/contracts/${contract._id}`,
            },
            createdAt: new Date().toISOString(),
          })),
        });
      });
    }
  }, [accessToken, searchFilters.status, pagination, debouncedSearchValue]);

  return (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item xs={6}>
        <Typography variant="h6" component="h2" gutterBottom>
          Contracts
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <SearchBar
            label="Search contracts by reference"
            value={searchValue}
            setValue={setSearchValue}
          />
          <ContractStatusFilters
            selectedContractStatus={searchFilters.status}
            setSelectedContractStatus={(status) => {
              const searchFiltersInitialStatusQueryParamKey = "status";
              router.push(
                `/contracts?${searchFiltersInitialStatusQueryParamKey}=${status}`
              );
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <DataTable
          count={contracts.count}
          start={contracts.start}
          limit={contracts.limit}
          rows={contracts.results}
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
