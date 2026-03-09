import { Request, Response } from "express";
import UsersService from "../services/users.service";
import { UpdateUserdetails } from "../utils/types";


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
    const updateUserParams: UpdateUserdetails = req.body;
    const user = await UsersService.updateUser(id, updateUserParams);
    res.json(user);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    const user = await UsersService.detleteUser(Number(req.params.id));
    res.json("User deleted");
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
};
