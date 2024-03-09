import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { PropsWithChildren, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createUser } from "../../services/andrew-api.service";
import { setAuthenticatedUser } from "../../store/reducers/authenticated-user.reducer";

export interface SetAuthenticatedUserProps extends PropsWithChildren {}

export function SetAuthenticatedUser({ children }: SetAuthenticatedUserProps) {
  const { accessToken } = useOidcAccessToken();
  const authenticatedUser = useAppSelector((state) => state.authenticatedUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (accessToken && !authenticatedUser?._id) {
      createUser(accessToken).then((data) => {
        dispatch(setAuthenticatedUser(data));
      });
    }
  }, [accessToken, authenticatedUser]);

  return children;
}
