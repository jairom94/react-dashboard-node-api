import {
  client,
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "../../api/client";
import storage from "../../utils/storage";
import type { Login, LoginResponse, User, UserResponse } from "./types";

const URL_AUTH = "/api/auth";

export const singUp = async (bodyUser: User) => {
  const url = `${URL_AUTH}/signup`;
  const response = await client.post<UserResponse>(url, bodyUser);
  return response.data;
};

export const LogIn = async (bodyLogin: Login) => {
  const url = `${URL_AUTH}/login`;
  const { remember,email,password } = bodyLogin  
  const response = await client.post<LoginResponse>(url, {email,password});
    const { accessToken } = response.data;
    if (remember) {
      storage.set("auth", accessToken);
    }
    setAuthorizationHeader(accessToken);
};

export const logOut = async () => {
  storage.remove("auth");
  removeAuthorizationHeader();
};

export const userInformation = async () => {
  const url = `${URL_AUTH}/me`;
  const response = await client.get<UserResponse>(url);
  return response.data;
};
