import {
  Box,
  Button,
  Grid,
  Hidden,
  Pagination,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/Datatable";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { SearchBar } from "../../components/SearchBar";
import { RenderCellLink } from "../../components/Datatable/RenderCellLink";
import { RenderCellApplicationSatus } from "../../components/Datatable/RenderCellStatus";
import { RenderCellDate } from "../../components/Datatable/RenderCellDate";
import { NewButton } from "../../components/NewButton";
import { ApplicationStatus } from "../../lib/application-status.enum";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { PaginatedResults } from "../../lib/paginated-results.interface";
import {
  getPendingSubscriptionCount,
  listSubscriptionApplications,
} from "../../services/andrew-api.service";
import { Application } from "../../lib/subscription-application.interface";
import { ApplicationStatusFilters } from "./ApplicationStatusFilters";
import { usePagination } from "../../hooks/usePagination";
import { useDebounce } from "../../hooks/useDebounce";
import { ApplicationsCardsList } from "./ApplicationsCardsList";

export interface ApplicationsConcernProps {
  searchFilters: {
    status: ApplicationStatus;
  };
  setSearchFilters: (searchFilters: { status: ApplicationStatus }) => void;
}

export function ApplicationsConcern({
  searchFilters = { status: ApplicationStatus.PENDING },
  setSearchFilters = (newFilters) => {},
}: ApplicationsConcernProps) {
  const columns: GridColDef[] = [
    {
      field: "reference",
      headerName: "Ref",
      flex: 2,
      renderCell: RenderCellLink,
    },
    {
      field: "user",
      headerName: "User",
      flex: 1,
      renderCell: RenderCellLink,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: RenderCellApplicationSatus,
    },
    {
      field: "createdAt",
      headerName: "Created at",
      flex: 1,
      renderCell: RenderCellDate,
    },
  ];

  const router = useRouter();

  function handleNewSubscriptionApplication() {
    router.push(`/applications/new`);
  }

  const { accessToken } = useOidcAccessToken();
  const [subscriptionApplications, setSubscriptionApplications] = useState<
    PaginatedResults<{
      id: string;
      reference: {
        label: string;
        href: string;
      };
      user: {
        label: string;
        href: string;
      };
      status: ApplicationStatus;
      createdAt: string;
    }>
  >({
    count: 0,
    results: [],
    limit: 10,
    start: 0,
  });

  const [
    pendingSubscriptionApplicationsCount,
    setPedingSubscriptionApplicationsCount,
  ] = useState<number | null>(null);

  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 400);

  const { pagination, setPagination } = usePagination(10, 1);

  useEffect(() => {
    if (accessToken) {
      getPendingSubscriptionCount(accessToken).then((count) =>
        setPedingSubscriptionApplicationsCount(count)
      );
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken && pagination) {
      listSubscriptionApplications(
        accessToken,
        searchFilters.status,
        {
          start: (pagination.page - 1) * pagination.pageSize,
          limit: pagination.pageSize,
        },
        { value: debouncedSearchValue }
      ).then((data) => {
        setSubscriptionApplications({
          ...data,
          results: data.results.map((subscriptionApplication: Application) => ({
            id: subscriptionApplication._id,
            reference: {
              label: subscriptionApplication.ref,
              href: `/applications/${subscriptionApplication._id}`,
            },
            user: {
              label: `${subscriptionApplication.customer.fullName}`,
              href: `/users/${subscriptionApplication.customer._id}`,
            },
            status: subscriptionApplication.status,
            createdAt: subscriptionApplication.createdAt,
          })),
        });
      });
    }
  }, [accessToken, searchFilters.status, pagination, debouncedSearchValue]);

  const matches = useMediaQuery("(min-width:600px)");

  return (
    <Grid container spacing={2} alignItems="flex-start">
       <Grid item xs={12} display={"flex"} alignItems={"center"} gap={1}>
        <FolderOutlinedIcon color="inherit" />
        <Typography variant="h6" component="h2">
          Applications
        </Typography>
      </Grid>
      {pendingSubscriptionApplicationsCount &&
      pendingSubscriptionApplicationsCount <= 5 ? (
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Hidden mdUp>
            <NewButton onClick={handleNewSubscriptionApplication} />
          </Hidden>
          <Hidden lgDown>
            <Button
              onClick={handleNewSubscriptionApplication}
              variant="contained"
              endIcon={<ArrowRightAltOutlinedIcon />}
            >
              New application
            </Button>
          </Hidden>
        </Grid>
      ) : (
        false
      )}
      <Grid item xs={12}>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <SearchBar
            label="Search subscription applications by reference"
            value={searchValue}
            setValue={setSearchValue}
          />
          <ApplicationStatusFilters
            selectedApplicationStatus={searchFilters.status}
            setSelectedApplicationStatus={(status) => {
              const searchFiltersInitialStatusQueryParamKey = "status";
              router.push(
                `/applications?${searchFiltersInitialStatusQueryParamKey}=${status}`
              );
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        {matches ? (
          <DataTable
            count={subscriptionApplications.count}
            start={subscriptionApplications.start}
            limit={subscriptionApplications.limit}
            rows={subscriptionApplications.results}
            columns={columns}
            onPaginationChange={(newPagination) => {
              setPagination(newPagination);
            }}
            pageSizeOptions={[5, 10, 25, 50, 100]}
          />
        ) : (
          <Stack gap={4}>
            <ApplicationsCardsList
              rows={subscriptionApplications?.results || []}
            />
            {subscriptionApplications?.count ? (
              <Pagination
                size="large"
                sx={{ mb: 4 }}
                count={Math.ceil(
                  subscriptionApplications.count / pagination.pageSize
                )}
                page={pagination.page}
                onChange={(
                  event: React.ChangeEvent<unknown>,
                  value: number
                ) => {
                  setPagination({ ...pagination, page: value });
                }}
              />
            ) : (
              false
            )}
          </Stack>
        )}
      </Grid>
    </Grid>
  );
}
