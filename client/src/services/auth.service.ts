import type { AuthResponse, LoginData, RegisterData } from "../types/types";
import { api } from "../api/axiosInstance";

export const registerUser = async (
  userData: RegisterData,
): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", userData);

  return res.data;
};

export const login = async (credentials: LoginData): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", credentials);
  const userId = res.data.user.id;
  localStorage.setItem("accessToken", res.data.accessToken);
  localStorage.setItem("refreshToken", res.data.refreshToken);
  localStorage.setItem("userId", userId.toString());
  return res.data;
};

export const logout = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    await api.post("/auth/logout", { refreshToken });
  }
};
