import Container from "@mui/material/Container";
import { DeviceConcern } from "../../concerns/device/index";
import { OidcSecure } from "@axa-fr/react-oidc";
import { useRouter } from "next/router";
import { SetAuthenticatedUser } from "../../concerns/authenticated-user/SetAuthenticatedUser";
import { OidcRoleGuard } from "../../components/OidcRoleGuard";
import { AvailableRoles } from "../../lib/available-roles.enum";

export default function Device() {
  const router = useRouter();
  return (
    <OidcSecure>
      <OidcRoleGuard hasAccessRoles={[AvailableRoles.USER]}>
        <SetAuthenticatedUser>
          <Container>
            <DeviceConcern id={(router?.query?.id as string) || null} />
          </Container>
        </SetAuthenticatedUser>
      </OidcRoleGuard>
    </OidcSecure>
  );
}
