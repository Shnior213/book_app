import { Router } from "express";
import UsersController from "../controllers/users.controller";
import {
  authMiddleware,
  isAdminMiddleware,
  sameUserOrAdminMiddleware,
} from "../middleware/auth";

// import { AppDataSource } from "../data-source";
// import { UserService }from '../services/users.service'
// import { UserController }from '../controllers/users.controller'
// const userRepo = AppDataSource.getRepository("User");
// const userService = new UserService(userRepo);
// const userController = new UserController(userService);

const router = Router();


router.get("/", authMiddleware, UsersController.findAll);
router.get(
  "/:id",
  authMiddleware,
  sameUserOrAdminMiddleware,
  UsersController.findOneById,
);
router.put(
  "/:id",
  authMiddleware,
  sameUserOrAdminMiddleware,
  UsersController.updateUser,
);
router.delete(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  UsersController.deleteUser,
);

export default router;
