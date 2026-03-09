import { Router } from "express";
import ReviewsController from "../controllers/reviews.controller";
import {
  authMiddleware,
  isAdminMiddleware,
  sameUserOrAdminMiddleware,
} from "../middleware/auth";

const router = Router();

router.post("/", authMiddleware, ReviewsController.createReview);
router.get("/", authMiddleware, ReviewsController.findReviews);
router.get(
  "/:id",
  authMiddleware,
  sameUserOrAdminMiddleware,
  ReviewsController.findReview,
);
router.put(
  "/:id",
  authMiddleware,
  sameUserOrAdminMiddleware,
  ReviewsController.updateReview,
);
router.delete(
  "/:id",
  authMiddleware,
  sameUserOrAdminMiddleware,
  ReviewsController.deleteReview,
);

export default router;
