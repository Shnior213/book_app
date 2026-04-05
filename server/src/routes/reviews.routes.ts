import { Router } from "express";
import ReviewsController from "../controllers/reviews.controller";
import {
  authMiddleware,
  isAdminMiddleware,
  sameUserOrAdminMiddleware,
} from "../middleware/auth";

const router = Router();

router.use(authMiddleware);

router.post("/", ReviewsController.createReview);
router.get("/", ReviewsController.findReviews);
router.get("/:id", sameUserOrAdminMiddleware, ReviewsController.findReview);
router.put("/:id", sameUserOrAdminMiddleware, ReviewsController.updateReview);
router.delete(
  "/:id",
  sameUserOrAdminMiddleware,
  ReviewsController.deleteReview,
);

export default router;
