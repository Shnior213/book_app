import { Review } from "../entities/reviews";

export type CreateBookDetails = {
  title: string,
  author: string,
  userId: number,
  reviews: Review[],
  image?: string,
}

export type UpdateBookDetails = {id: number} &  CreateBookDetails