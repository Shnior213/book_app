import type { Review } from "../types/types";
import { api } from "../api/axiosInstance";

export const addReview = async (review: Review) => {
  const res = await api.post("/reviews", review);
  console.log(res);
  return res.data;
};
