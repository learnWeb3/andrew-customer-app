import { PropsWithChildren, ReactElement } from "react";
import { Grid, Hidden } from "@mui/material";
import Navbar from "./Navbar";
import MenuNavigation from "./MenuNavigation/index";
import { OidcProvider } from "@axa-fr/react-oidc";
import { useRouter } from "next/router";
import { FullScreenContainer } from "./FullScreenContainer";
import { Loader } from "./Loader/Loader";
import { Error } from "./Error";
import { AuthenticationCallbackSuccess } from "./AuthenticationCallbackSuccess";
import { LiveNotificationHandler } from "./LiveNotificationHandler";

export interface AuthenticatedLayoutProps extends PropsWithChildren {
  menuLeft?: ReactElement | null;
  navbar?: ReactElement | null;
  onlyAuth?: boolean;
}

export const configuration = {
  client_id: process.env.NEXT_PUBLIC_OIDC_CLIENT_ID as string,
  redirect_uri:
    process.env.NEXT_PUBLIC_FRONTEND_URL + "/#authentication/callback",
  silent_redirect_uri:
    process.env.NEXT_PUBLIC_FRONTEND_URL + "/#authentication/silent-callback", // Optional activate silent-signin that use cookies between OIDC server and client javascript to restore the session
  scope: process.env.NEXT_PUBLIC_OIDC_SCOPES as string,
  authority: process.env.NEXT_PUBLIC_OIDC_AUTHORITY as string,
};

const onEvent = (configurationName: string, eventName: string, data: any) => {
  // eslint-disable-next-line no-undef
  // console.log(`oidc:${configurationName}:${eventName}`, data);
};

export function AuthenticatedLayout({
  children,
  onlyAuth = false,
  navbar = (
    <Grid item xs={12}>
      <Navbar />
    </Grid>
  ),
  menuLeft = (
    <Hidden lgDown>
      <Grid item xs={3}>
        <MenuNavigation />
      </Grid>
    </Hidden>
  ),
}: AuthenticatedLayoutProps) {
  const router = useRouter();
  const withCustomHistory = () => {
    return {
      replaceState: (url: string) => {
        router
          .replace({
            pathname: url,
          })
          .then(() => {
            // eslint-disable-next-line no-undef
            window.dispatchEvent(new Event("popstate"));
          });
      },
    };
  };
  return (
    <OidcProvider
      sessionLostComponent={() => (
        <FullScreenContainer>
          <Error />
        </FullScreenContainer>
      )}
      authenticatingComponent={() => (
        <FullScreenContainer>
          <Loader />
        </FullScreenContainer>
      )}
      authenticatingErrorComponent={() => (
        <FullScreenContainer>
          <Error />
        </FullScreenContainer>
      )}
      loadingComponent={() => (
        <FullScreenContainer>
          <Loader />
        </FullScreenContainer>
      )}
      serviceWorkerNotSupportedComponent={() => (
        <FullScreenContainer>
          <Error />
        </FullScreenContainer>
      )}
      callbackSuccessComponent={() => <AuthenticationCallbackSuccess />}
      configuration={configuration}
      onEvent={onEvent}
      withCustomHistory={withCustomHistory}
    >
      <LiveNotificationHandler>
        {onlyAuth ? (
          children
        ) : (
          <Grid
            container
            spacing={0}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {menuLeft}
            <Grid
              item
              xs={12}
              lg={9}
              container
              spacing={4}
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              {navbar}
              <Grid item xs={12}>
                {children}
              </Grid>
            </Grid>
          </Grid>
        )}
      </LiveNotificationHandler>
    </OidcProvider>
  );
}
