import { setToken } from "../utils/storage";
import api from "./axiosInstance";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  accessToken: string;
}

export const login = async (data: LoginFormData): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", data);
  const { accessToken } = response.data;
  setToken(accessToken); // Store the token in session storage
  return response.data;
};
