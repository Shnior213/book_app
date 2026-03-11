import { Request, Response } from "express";
import ReviewsService from "../services/reviews.service";

async function createReview(req: Request, res: Response) {
  try {
    const { content, rating, bookId } = req.body;
    const userId = req.user!.id;
    // const bookId = req.book!.id;

    if (!bookId) {
      return res.status(400).json({ message: "bookId is required" });
    }

    const review = await ReviewsService.createReview(
      content,
      Number(rating),
      userId,
      bookId,
    );
    res.status(201).json(review);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function findReviews(req: Request, res: Response) {
  try {
    const reviews = await ReviewsService.findReviews();
    res.json(reviews);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function findReview(req: Request, res: Response) {
  try {
    const review = await ReviewsService.findReview(Number(req.params.id));
    res.json(review);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function updateReview(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { content, rating, userId, bookId } = req.body;
    const review = ReviewsService.updateReview(
      id,
      content,
      rating,
      userId,
      bookId,
    );
    res.json(review);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function deleteReview(req: Request, res: Response) {
  try {
    const review = await ReviewsService.deleteReview(Number(req.params.id));
    res.json("review deleted");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

export default {
  createReview,
  findReviews,
  findReview,
  updateReview,
  deleteReview,
};
