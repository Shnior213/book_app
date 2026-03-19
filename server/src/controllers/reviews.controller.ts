import { Request, Response } from "express";
import ReviewsService from "../services/reviews.service";
import {
  CreateReviewDetails,
  UpdateReviewDetails,
} from "../types/reviews.types";

async function createReview(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    
    const { bookId } = req.body;
    if (!bookId) {
      return res.status(400).json({ message: "bookId is required" });
    }

    const createReviewDetails: CreateReviewDetails = {...req.body,
      userId
    };

    const review = await ReviewsService.createReview(createReviewDetails);
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
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid review ID" });
    }
    const updateReviewDetails: UpdateReviewDetails = { ...req.body, id };
    const review = await ReviewsService.updateReview(updateReviewDetails);
    res.json(review);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function deleteReview(req: Request, res: Response) {
  try {
    await ReviewsService.deleteReview(Number(req.params.id));
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
