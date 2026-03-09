import { Router } from "express";
import BooksController from "../controllers/books.controller";
import {
  authMiddleware,
  isAdminMiddleware,
  sameUserOrAdminMiddleware,
} from "../middleware/auth";
import { upload } from "../middleware/upload";

const router = Router();

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  BooksController.createBook,
);
router.get("/", BooksController.findBooks);
router.get("/:id", authMiddleware, BooksController.findBook);
router.put(
  "/:id",
  authMiddleware,
  // sameUserOrAdminMiddleware,
  upload.single("image"),
  BooksController.updateBook,
);
router.delete(
  "/:id",
  authMiddleware,
  // isAdminMiddleware,
  BooksController.deleteBook,
);
router.post("/:id/read", authMiddleware, BooksController.readedBook);
router.delete("/:id/read", authMiddleware, BooksController.unReadedBook);

export default router;
