import Container from "@mui/material/Container";
import { HomeConcern } from "../concerns/home/index";
import { OidcSecure } from "@axa-fr/react-oidc";
import { OidcRoleGuard } from "../components/OidcRoleGuard";
import { SetAuthenticatedUser } from "../concerns/authenticated-user/SetAuthenticatedUser";
import { AvailableRoles } from "../lib/available-roles.enum";
import { GreetNewUserMetricReport } from "../components/GreetNewUserMetricReport";

export default function Home() {
  return (
    <OidcSecure>
      <OidcRoleGuard hasAccessRoles={[AvailableRoles.USER]}>
        <SetAuthenticatedUser>
          <Container>
            <GreetNewUserMetricReport>
              <HomeConcern />
            </GreetNewUserMetricReport>
          </Container>
        </SetAuthenticatedUser>
      </OidcRoleGuard>
    </OidcSecure>
  );
}
