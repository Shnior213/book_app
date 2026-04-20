import { Router } from "express";
import CategoryController from "../controllers/category.controller";
import {
  authMiddleware,
  isAdminMiddleware,
  sameUserOrAdminMiddleware,
} from "../middleware/auth";

const router = Router();

router.get("/", CategoryController.findCategories);

router.use(authMiddleware);

router.post("/", isAdminMiddleware, CategoryController.createCategory);
router.get("/:id", sameUserOrAdminMiddleware, CategoryController.findCategory);
router.put(
  "/:id",
  sameUserOrAdminMiddleware,
  CategoryController.updateCategory,
);
router.delete(
  "/:id",
  sameUserOrAdminMiddleware,
  CategoryController.deleteCategory,
);

export default router;
