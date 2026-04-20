import usersRoutes from "./users.routes";
import booksRoutes from "./books.routes";
import reviewsRoutes from "./reviews.routes";
import authRoutes from "./auth.routes";
import categoriesRoutes from "./category.routes";
import { Router } from "express";

const rootRouter = Router();

rootRouter.use("/users", usersRoutes);
rootRouter.use("/books", booksRoutes);
rootRouter.use("/reviews", reviewsRoutes);
rootRouter.use("/auth", authRoutes);
rootRouter.use("/categories", categoriesRoutes);


export default rootRouter