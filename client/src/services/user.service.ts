import type { User } from "../types/types";
import { api } from "../api/axiosInstance";

export const getUserById = async (id: number): Promise<User> => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

export const getAllUsers = async (): Promise<User[]> => {
  const res = await api.get("/users");
  return res.data;
};

export const deleteUser = async (id: number) => {
  const res = await api.delete(`/users/${id}`);
  console.log(res.data);
  
  return res.data;
};