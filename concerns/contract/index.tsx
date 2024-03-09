import { Grid, Typography } from "@mui/material";
import Breadcrumb from "../../components/Breadcrumb";
import { useRouter } from "next/router";
import { DevicesDetail } from "./DevicesDetail";
import { VehiclesDetail } from "./VehiclesDetail";
import { ContractDetail } from "./ContractDetail";
import { ContractStatus } from "../../lib/contract-status.enum";
import { useEffect, useState } from "react";
import { ContractStatusDropdown } from "./ContractStatusDropdown";
import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { findContract } from "../../services/andrew-api.service";
import { Contract } from "../../lib/contract.interface";
import { AlertStatus } from "./AlertStatus";
import { ProceedToCheckout } from "./ProceedToCheckout";

export interface ContractConcernProps {
  id: string | null;
}
export function ContractConcern({ id }: ContractConcernProps) {
  const { accessToken } = useOidcAccessToken();
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    if (accessToken && id) {
      findContract(id, accessToken).then((data) => setContract(data));
    }
  }, [id, accessToken]);
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
        <Typography variant="h4" component="h2">
          {contract?.ref}
        </Typography>

        {contract ? (
          <ContractStatusDropdown activeItemId={contract.status} />
        ) : (
          false
        )}
      </Grid>

      {/* <Grid item xs={12}>
        <ContractStatistics />
      </Grid> */}

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
