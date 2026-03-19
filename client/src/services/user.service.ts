import type { User } from "../types/types";
import { api } from "../api/axiosInstance";

export const getUserById = async (id: number): Promise<User> => {
  const res = await api.get(`/users/${id}`);

  return res.data;
};
