import type { BookResponse } from "../types/types";
import { api } from "../api/axiosInstance";

export const markBookAsRead = async (bookId: number) => {
  const res = await api.post(`/users/read-book/${bookId}`);
  return res.data;
};

export const getAllBooks = async (): Promise<BookResponse[]> => {
  const res = await api.get("/books");
  return res.data;
};

export const addBook = async (book: FormData) => {
  const res = await api.post("/books", book);
  return res.data;
};
