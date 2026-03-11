import { User } from "../entities/users";
import { Book } from "../entities/books";
import { AppDataSource } from "../data-source";
import { Review } from "../entities/reviews";

const reviewRepo = AppDataSource.getRepository(Review);
const bookRepo = AppDataSource.getRepository(Book);
const userRepo = AppDataSource.getRepository(User);

async function createReview(
  content: string,
  rating: number,
  userId: number,
  bookId: number,
) {
  const user = await userRepo.findOneBy({ id: userId });
  if (!user) throw new Error("User not found");

  const book = await bookRepo.findOneBy({ id: bookId });
  if (!book) throw new Error("Book not found");

  const review = reviewRepo.create({ content, rating, user, book });

  return await reviewRepo.save(review);
}

async function findReviews() {
  const reviews = await reviewRepo.find({
    relations: { user: true, book: true },
  });
  if (!reviews) throw new Error("reviews Not Found");
  return reviews;
}

async function findReview(id: number) {
  const review = await reviewRepo.findOne({
    where: { id },
    relations: { user: true, book: true },
  });
  if (!review) throw new Error("review Not Found");
  return review;
}

async function updateReview(
  id: number,
  content: string,
  rating: number,
  userId: number,
  bookId: number,
) {
  const review = await reviewRepo.findOne({
    where: { id },
    relations: {
      user: true,
      book: true,
    },
  });
  if (!review) throw new Error("Review not found");

  const user = await userRepo.findOneBy({ id: userId });
  const book = await bookRepo.findOneBy({ id: bookId });
  if (!user || !book) throw new Error("User  or Book not found");

  reviewRepo.merge(review, { content, rating });

  return await reviewRepo.save(review);
}

async function deleteReview(id: number) {
  const result = await reviewRepo.delete(id);
  return result;
}

export default {
  createReview,
  findReviews,
  findReview,
  updateReview,
  deleteReview,
};
