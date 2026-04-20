import type { Category, CategoryResponse } from "../types/types";
import { api } from "../api/axiosInstance";

export const addCategory = async (category: Category) => {
  const res = await api.post("/categories", category);
  return res.data;
};

export const getCategory = async (
  categoryId: number,
): Promise<CategoryResponse> => {
  const res = await api.get(`/categories/${categoryId}`);
  return res.data;
};

export const getCategories = async (): Promise<CategoryResponse[]> => {
  const res = await api.get(`/categories`);
  return res.data;
};
