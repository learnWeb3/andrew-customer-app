import Container from "@mui/material/Container";
import { ApplicationsConcern } from "../../concerns/applications";
import { OidcSecure } from "@axa-fr/react-oidc";
import { SetAuthenticatedUser } from "../../concerns/authenticated-user/SetAuthenticatedUser";
import { useRouter } from "next/router";
import { ApplicationStatus } from "../../lib/application-status.enum";

export default function Applications() {
  const router = useRouter();
  return (
    <OidcSecure>
      <SetAuthenticatedUser>
        <Container>
          <ApplicationsConcern
            initialSearchFiltersStatus={
              (router?.query?.status as ApplicationStatus) ||
              ApplicationStatus.PENDING
            }
          />
        </Container>
      </SetAuthenticatedUser>
    </OidcSecure>
  );
}
