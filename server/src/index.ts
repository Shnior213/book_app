import { AppDataSource } from "./data-source";
import express from "express";
import usersRoutes from "./routes/users.routes";
import booksRoutes from "./routes/books.routes";
import reviewsRoutes from "./routes/reviews.routes";
import authRoutes from "./routes/auth.routes";
import dotenv from "dotenv";
import { log } from "node:console";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

AppDataSource.initialize().then(() => {
  log("DB cretated");

  app.use("/users", usersRoutes);
  app.use("/books", booksRoutes);
  app.use("/reviews", reviewsRoutes);
  app.use("/auth", authRoutes);

  app.listen(process.env.PORT, () => {
    log(`Server runing on port ${process.env.PORT}`);
  });
});
