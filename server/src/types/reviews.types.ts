export type CreateReviewDetails = {
  content: string;
  rating: number;
  userId: number;
  bookId: number;
};

export type UpdateReviewDetails = { id: number } & CreateReviewDetails;
