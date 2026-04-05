import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/users";
import { Book } from "./entities/books";
import { Review } from "./entities/reviews";
import dotenv from "dotenv";

dotenv.config();

// console.log({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   db: process.env.DB_NAME,
// });

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Book, Review],
});
