import Container from "@mui/material/Container";
import { ApplicationConcern } from "../../concerns/application";
import { OidcSecure } from "@axa-fr/react-oidc";
import { useRouter } from "next/router";

export default function Application() {
  const router = useRouter();
  return (
    <OidcSecure>
      <Container>
        <ApplicationConcern id={(router?.query?.id as string) || null} />
      </Container>
    </OidcSecure>
  );
}
