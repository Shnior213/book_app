import { CreateUserDetails } from "../types/users.types";
import AuthSevice from "../services/auth.service";
import { Request, Response } from "express";

async function register(req: Request, res: Response) {
  try {
    const userRegisterDetailes: CreateUserDetails = req.body;
    const user = await AuthSevice.register(userRegisterDetailes);
    res.status(201).json(user);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function login(req: Request, res: Response) {
  try {
    const userRegisterDetailes = req.body;
    const result = await AuthSevice.login(userRegisterDetailes);
    res.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const result = await AuthSevice.refreshAccessToken(refreshToken);
    res.json(result);
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const result = await AuthSevice.logoutUser(refreshToken);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default {
  login,
  register,
  refresh,
  logout,
};
