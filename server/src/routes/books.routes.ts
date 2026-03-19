import { Router } from "express";
import BooksController from "../controllers/books.controller";
import {
  authMiddleware,
  isAdminMiddleware,
  sameUserOrAdminMiddleware,
} from "../middleware/auth";
import { upload } from "../middleware/upload";

const router = Router();

router.get("/", BooksController.findBooks);

router.use(authMiddleware);

router.post("/", upload.single("image"), BooksController.createBook);
router.get("/:id", BooksController.findBook);
router.put(
  "/:id",
  // sameUserOrAdminMiddleware,
  upload.single("image"),
  BooksController.updateBook,
);
router.delete(
  "/:id",
  // isAdminMiddleware,
  BooksController.deleteBook,
);
router.post("/:id/read", BooksController.readedBook);
router.delete("/:id/read", BooksController.unReadedBook);

export default router;
