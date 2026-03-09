import { User } from "../entities/users";
import { AppDataSource } from "../data-source";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CreateUserDetails, UpdateUserdetails } from "../utils/types";
import usersController from "../controllers/users.controller";

const userRepo = AppDataSource.getRepository(User);


async function findAll() {
  const users = await userRepo.find();
  if (!users) throw new Error("Users Not Found");
  return users;
}

async function findOneById(id: number) {
  const user = await userRepo.findOne({
    where: { id },
    relations: { readBooks: true, reviews: true },
  });
  if (!user) throw new Error("User Not Found");
  return user;
}

async function updateUser(id: number, updateUserParams: UpdateUserdetails) {
  const { email, name, password } = updateUserParams;
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

export default {
  findAll,
  findOneById,
  updateUser,
  detleteUser,
};
