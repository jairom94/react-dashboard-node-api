import axios from "axios";
import type { HttpHeaders } from "./type-axios-headers";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const setAuthorizationHeader = (accessToken: string) => {
  const httpHeader: HttpHeaders = "Authorization";
  client.defaults.headers[httpHeader] = `Bearer ${accessToken}`;
};

export const removeAuthorizationHeader = () => {
  const httpHeader: HttpHeaders = "Authorization";
  delete client.defaults.headers[httpHeader];
};

client.interceptors.request.use((config) => {
  if (config.url?.includes("/adverts")) {
    const headerContentType:HttpHeaders = "Content-Type"
    config.headers[headerContentType] = "multipart/form-data";
  }
  return config;
});
