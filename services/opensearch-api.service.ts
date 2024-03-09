import axios from "axios";

const opensearchApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_OPENSEARCH_ROOT_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

export function getAuthorizationHeaders(accessToken: string) {
  return {
    Authorization: `Brearer ${accessToken}`,
  };
}
