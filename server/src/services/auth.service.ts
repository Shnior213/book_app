import { AppDataSource } from "../data-source";
import jwt from "jsonwebtoken";
import { CreateUserDetails } from "../types/users.types";
import bcrypt from "bcryptjs";
import { User } from "../entities/users";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "123";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "123";

const userRepo = AppDataSource.getRepository(User);

const generateAccessToken = (id: number, email: string) => {
  return jwt.sign({ id, email }, ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const generateRefreshToken = (id: number, email: string) => {
  return jwt.sign({ id, email }, REFRESH_TOKEN_SECRET);
};

async function register(createUserParams: CreateUserDetails) {
  const { email, name, password } = createUserParams;

  if (!name || !email || !password) throw new Error("Please enter all fields");

  const existedUser = await userRepo.findOneBy({ email });
  if (existedUser) throw new Error("User allready exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = userRepo.create({ name, email, password: hashedPassword });
  await userRepo.save(user);

  const accessToken = generateAccessToken(user.id, user.email);
  const refreshToken = generateRefreshToken(user.id, user.email);

  user.refreshToken = refreshToken;
  await userRepo.save(user);

  return { user, accessToken, refreshToken };
}

async function login(createUserParams: CreateUserDetails) {
  const { email, password } = createUserParams;

  const user = await userRepo.findOneBy({ email });
  if (!user) throw new Error("User Not Found");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid details");

  const accessToken = generateAccessToken(user.id, user.email);
  const refreshToken = generateRefreshToken(user.id, user.email);

  user.refreshToken = refreshToken;
  await userRepo.save(user);

  return { user, accessToken, refreshToken };
}

async function refreshAccessToken(refreshToken: string) {
  if (!refreshToken) throw new Error(" no refresh token provided");

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as {
      id: number;
    };
  } catch (err) {
    throw new Error("Expired or invalid refresh token");
  }

  const user = await userRepo.findOneBy({ id: decoded.id, refreshToken });
  if (!user) throw new Error("invalid refresh token or user not found");

  const newAccessToken = generateAccessToken(decoded.id, user.email);
  
  return { accessToken: newAccessToken, userId: user.id, userName: user.name };
}

async function logoutUser(refreshToken: string) {
  if (!refreshToken) throw new Error("No refresh token provided");

  const user = await userRepo.findOne({ where: { refreshToken } });
  if (!user) throw new Error("Invalid token");

  user.refreshToken = null;
  await userRepo.save(user);

  return { message: "User logged out successfully" };
}

export default {
  login,
  register,
  refreshAccessToken,
  logoutUser,
};
