import { AppDataSource } from "./data-source";
import express from "express";
import rootRouter from "./routes/routes";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

AppDataSource.initialize()
  .then(() => {
    console.log("DB created");

    app.use("/api", rootRouter)

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ DB init failed:", error);
  });
