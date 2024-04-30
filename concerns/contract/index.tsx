import { Grid, Typography } from "@mui/material";
import Breadcrumb from "../../components/Breadcrumb";
import { DevicesDetail } from "./DevicesDetail";
import { VehiclesDetail } from "./VehiclesDetail";
import { ContractDetail } from "./ContractDetail";
import { ContractStatus } from "../../lib/contract-status.enum";
import { useEffect, useState } from "react";
import { ContractStatusDropdown } from "./ContractStatusDropdown";
import { useOidcAccessToken } from "@axa-fr/react-oidc";
import {
  findContract,
  findContractVehicles,
} from "../../services/andrew-api.service";
import { Contract } from "../../lib/contract.interface";
import { AlertStatus } from "./AlertStatus";
import { ProceedToCheckout } from "./ProceedToCheckout";
import { ContractStatistics } from "./ContractStatistics";
import { PaginatedResults } from "../../lib/paginated-results.interface";
import { Vehicle } from "../../lib/vehicle.interface";
import { MetricsReportsDetail } from "./MetricsReportsDetail";

export interface ContractConcernProps {
  id: string | null;
}
export function ContractConcern({ id }: ContractConcernProps) {
  const { accessToken } = useOidcAccessToken();
  const [contract, setContract] = useState<Contract | null>(null);

  const [vehicles, setVehicles] = useState<PaginatedResults<Vehicle>>({
    start: 0,
    limit: 10,
    results: [],
    count: 0,
  });

  useEffect(() => {
    if (accessToken && id) {
      findContract(id, accessToken).then((data) => setContract(data));
    }
  }, [id, accessToken]);

  useEffect(() => {
    if (contract?._id && accessToken) {
      findContractVehicles(contract?._id, accessToken).then((data) => {
        setVehicles(data);
      });
    }
  }, [contract, accessToken]);
  return (
    <Grid container spacing={4} alignItems="flex-start">
      <Grid item xs={12}>
        <Breadcrumb
          parts={
            contract
              ? [
                  {
                    label: "Contracts",
                    href: "/contracts",
                  },
                  {
                    label: contract.ref,
                    href: `/contracts/${contract._id}`,
                  },
                ]
              : [
                  {
                    label: "Contracts",
                    href: "/contracts",
                  },
                ]
          }
        />
      </Grid>
      <Grid
        item
        xs={12}
        lg={12}
        sx={{ display: "flex", alignItems: "center", gap: 4 }}
      >
        <Typography variant="h6" component="h2">
          {contract?.ref}
        </Typography>

        {contract ? (
          <ContractStatusDropdown activeItemId={contract.status} />
        ) : (
          false
        )}
      </Grid>

      <Grid item xs={12}>
        {vehicles?.results ? (
          <ContractStatistics
            vehiclesVIN={vehicles.results.map((vehicle) => vehicle.vin)}
            from={Date.now() - 365 * 2 * 24 * 60 * 60 * 1000}
          />
        ) : (
          false
        )}
      </Grid>

      {contract ? (
        <Grid item xs={12}>
          <AlertStatus status={contract?.status} />
        </Grid>
      ) : (
        false
      )}
      {contract ? (
        <Grid item xs={12}>
          <ContractDetail contract={contract} />
        </Grid>
      ) : (
        false
      )}
      {contract ? (
        <Grid item xs={12}>
          <VehiclesDetail contract={contract?._id} />
        </Grid>
      ) : (
        false
      )}
      {contract ? (
        <Grid item xs={12}>
          <DevicesDetail contract={contract?._id} />
        </Grid>
      ) : (
        false
      )}

      {vehicles?.results ? (
        <Grid item xs={12}>
          <MetricsReportsDetail
            vehiclesVIN={vehicles.results.map((vehicle) => vehicle.vin)}
          />
        </Grid>
      ) : (
        false
      )}

      {contract && contract.status === ContractStatus.PAYMENT_PENDING ? (
        <Grid item xs={12}>
          <ProceedToCheckout
            readOnly={false}
            proceedToCheckout={async () => {
              if (contract.ecommerceCheckoutURL) {
                window.location.href = contract.ecommerceCheckoutURL;
              }
            }}
          />
        </Grid>
      ) : (
        false
      )}
    </Grid>
  );
}
