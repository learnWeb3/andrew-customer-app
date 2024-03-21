import axios from "axios";
import { configuration } from "../components/AuthenticatedLayout";
import { OidcClient } from "@axa-fr/react-oidc";

const ecommerceApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ECOMMERCE_API_ROOT_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

ecommerceApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        const oidc = OidcClient.getOrCreate(() => fetch)(configuration);
        await oidc.renewTokensAsync();
        const getValidToken = await oidc.getValidTokenAsync();
        if (!getValidToken || !getValidToken.isTokensValid) {
          return oidc.loginAsync(undefined, undefined);
        }
        const access_token = getValidToken?.tokens?.accessToken;
        ecommerceApi.defaults.headers.common["Authorization"] =
          "Bearer " + access_token;
        return ecommerceApi(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
    return Promise.reject(error);
  }
);

export function getAuthorizationHeaders(accessToken: string) {
  return {
    Authorization: `Brearer ${accessToken}`,
  };
}

export function listProducts(accessToken: string) {
  const endpoint = `/product`;
  const headers = {
    ...getAuthorizationHeaders(accessToken),
  };

  return ecommerceApi
    .get(endpoint, {
      headers,
    })
    .then((response) => response.data);
}
