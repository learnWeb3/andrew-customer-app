import { PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useOidc, useOidcAccessToken } from "@axa-fr/react-oidc";
import { AvailableRoles } from "../lib/available-roles.enum";
import { Avatar, Box, IconButton } from "@mui/material";
import { FullScreenContainer } from "./FullScreenContainer";
import { Error, ErrorType } from "./Error";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

export interface OidcRoleGuardProps extends PropsWithChildren {
  hasAccessRoles: AvailableRoles[];
  UnauthorizedComponent?: ((props: any) => ReactElement | null) | null;
}

export function OidcRoleGuard({
  hasAccessRoles = [],
  children,
  UnauthorizedComponent = () => {
    const { logout } = useOidc();
    return (
      <Box
        sx={{
          position: "absolute",
          zIndex: 1000,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "primary.main",
          color: "secondary.main",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            py: 2,
            px: 3
          }}
          display={"flex"}
          width={"100%"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <IconButton
            size="large"
            edge="end"
            aria-label="Sign out"
            aria-haspopup="true"
            onClick={() => logout("/")}
            title="logout"
          >
            <Avatar variant="circular" sx={{ bgcolor: "secondary.main" }}>
              <ExitToAppOutlinedIcon color="primary" />
            </Avatar>
          </IconButton>
        </Box>
        <FullScreenContainer>
          <Error type={ErrorType.UNAUTHORIZED} />
        </FullScreenContainer>
      </Box>
    );
  },
}: OidcRoleGuardProps) {
  const { accessToken } = useOidcAccessToken();
  const [decoded, setDecoded] = useState<
    (JwtPayload & { roles: string[] }) | null
  >(null);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  useEffect(() => {
    if (accessToken) {
      setDecoded(jwtDecode<JwtPayload & { roles: string[] }>(accessToken));
    }
  }, [accessToken]);

  useEffect(() => {
    if (decoded && hasAccessRoles) {
      const decodedRolesMap = decoded.roles.reduce(
        (map: Record<string, boolean>, role: string) => {
          map[role] = true;
          return map;
        },
        {}
      );
      for (const role of hasAccessRoles) {
        if (decodedRolesMap[role]) {
          setHasAccess(true);
          return;
        }
      }
      return;
    }
  }, [hasAccessRoles, decoded]);

  return hasAccess ? (
    children
  ) : UnauthorizedComponent ? (
    <UnauthorizedComponent />
  ) : null;
}
