import type { AuthResponse, AuthFormFields } from "../types/types";
import { api } from "../api/axiosInstance";

export const registerUser = async (
  userData: AuthFormFields,
): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", userData);

  return res.data;
};

export const login = async (credentials: AuthFormFields): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", credentials);
  console.log(res.data);
  
  const userId = res.data.user.id;
  const isAdmin = res.data.user.isAdmin;
  localStorage.setItem("accessToken", res.data.accessToken);
  localStorage.setItem("refreshToken", res.data.refreshToken);
  localStorage.setItem("userId", userId.toString());
  localStorage.setItem("isAdmin", isAdmin.toString());
  return res.data;
};

export const logout = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    await api.post("/auth/logout", { refreshToken });
  }
};
