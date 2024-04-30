import Container from "@mui/material/Container";
import { DevicesConcern } from "../../concerns/devices";
import { OidcSecure } from "@axa-fr/react-oidc";
import { OidcRoleGuard } from "../../components/OidcRoleGuard";
import { SetAuthenticatedUser } from "../../concerns/authenticated-user/SetAuthenticatedUser";
import { AvailableRoles } from "../../lib/available-roles.enum";
import { useRouter } from "next/router";
import { DeviceStatus } from "../../lib/device-status.enum";
import { useEffect, useState } from "react";

export default function Devices() {
  const searchFiltersInitialStatusQueryParamKey = "status";
  const router = useRouter();
  const [searchFilters, setSearchFilters] = useState<{
    status: DeviceStatus;
  } | null>(null);

  useEffect(() => {
    if (router?.query?.[searchFiltersInitialStatusQueryParamKey]) {
      setSearchFilters({
        status: router?.query?.[
          searchFiltersInitialStatusQueryParamKey
        ] as DeviceStatus,
      });
    } else {
      setSearchFilters({ status: DeviceStatus.PAIRED });
    }
  }, [router]);

  return (
    <OidcSecure>
      <OidcRoleGuard hasAccessRoles={[AvailableRoles.USER]}>
        <SetAuthenticatedUser>
          <Container>
            {searchFilters ? (
              <DevicesConcern
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
