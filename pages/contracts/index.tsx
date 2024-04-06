import Container from "@mui/material/Container";
import { ContractsConcern } from "../../concerns/contracts";
import { OidcSecure } from "@axa-fr/react-oidc";
import { SetAuthenticatedUser } from "../../concerns/authenticated-user/SetAuthenticatedUser";
import { OidcRoleGuard } from "../../components/OidcRoleGuard";
import { AvailableRoles } from "../../lib/available-roles.enum";
import { ContractStatus } from "../../lib/contract-status.enum";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Contract() {
  const searchFiltersInitialStatusQueryParamKey = "status";
  const router = useRouter();
  const [searchFilters, setSearchFilters] = useState<{
    status: ContractStatus;
  } | null>(null);

  useEffect(() => {
    if (router?.query?.[searchFiltersInitialStatusQueryParamKey]) {
      setSearchFilters({
        status: router?.query?.[
          searchFiltersInitialStatusQueryParamKey
        ] as ContractStatus,
      });
    } else {
      setSearchFilters({ status: ContractStatus.ACTIVE });
    }
  }, [router]);

  return (
    <OidcSecure>
      <OidcRoleGuard hasAccessRoles={[AvailableRoles.USER]}>
        <SetAuthenticatedUser>
          <Container>
            {searchFilters ? (
              <ContractsConcern
                searchFilters={searchFilters}
                setSearchFilters={setSearchFilters}
              />
            ) : (
              false
            )}
          </Container>
        </SetAuthenticatedUser>
      </OidcRoleGuard>
    </OidcSecure>
  );
}
