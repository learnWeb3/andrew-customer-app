import axios from "axios";

const ecommerceApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ECOMMERCE_API_ROOT_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

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
