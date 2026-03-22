import { User } from "../entities/users";
import { AppDataSource } from "../data-source";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UpdateUserDetails } from "../types/users.types";
import usersController from "../controllers/users.controller";
import { Book } from "../entities/books";

const userRepo = AppDataSource.getRepository(User);
const bookRepo = AppDataSource.getRepository(Book);

async function findAll() {
  const users = await userRepo.find();
  if (!users) throw new Error("Users Not Found");
  return users;
}

async function findOneById(id: number) {
  const user = await userRepo.findOne({
    where: { id },
    relations: { readBooks: { reviews: true } },
  });
  if (!user) throw new Error("User Not Found");
  return user;
}

async function updateUser(updateUserParams: UpdateUserDetails) {
  const { id, email, name, password } = updateUserParams;
  const user = await userRepo.findOneBy({ id });
  if (!user) throw new Error("User Not Found");

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateUserParams.password = hashedPassword;
  }
  userRepo.merge(user, updateUserParams);
  const result = await userRepo.save(user);
  return result;
}

async function detleteUser(id: number) {
  const result = await userRepo.delete(id);
  return result;
}

async function addReadBook(userId: number, bookId: number) {
  const user = await userRepo.findOne({
    where: { id: userId },
    relations: { readBooks: true },
  });

  const book = await bookRepo.findOneBy({ id: bookId });

  if (!user || !book) {
    throw new Error("user or book not found");
  }

  const alreadyExists = user.readBooks?.some((b) => b.id === bookId);

  if (!alreadyExists) {
    user.readBooks = [...(user.readBooks || []), book];
    await userRepo.save(user);
    return { message: "book added", user };
  }
  // else {
  //   throw new Error("This book is already in your read list");
  // }
  return { message: "book already exists", user };
}

export default {
  findAll,
  findOneById,
  updateUser,
  detleteUser,
  addReadBook,
};
