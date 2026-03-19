import { Request, Response } from "express";
import UsersService from "../services/users.service";
import { UpdateUserDetails } from "../types/users.types";

async function findAll(req: Request, res: Response) {
  try {
    const users = await UsersService.findAll();
    res.json(users);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function findOneById(req: Request, res: Response) {
  try {
    const user = await UsersService.findOneById(Number(req.params.id));
    res.json(user);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updateUserParams: UpdateUserDetails = {...req.body, id};
    const user = await UsersService.updateUser(updateUserParams);
    res.json(user);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    await UsersService.detleteUser(Number(req.params.id));
    res.json("User deleted");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function addReadBook(req: Request, res: Response) {
  try {
    const bookId = Number(req.params.bookId);

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "unauthorizzed" });
    }
    const updatedUser = await UsersService.addReadBook(userId, bookId);
    res.json(updatedUser);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

export default {
  findAll,
  findOneById,
  updateUser,
  deleteUser,
  addReadBook,
};
