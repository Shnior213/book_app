import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "123";

type JwtPayload = {
  id: number;
  email: string;
  isAdmin?: boolean;
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer "))
    return res.status(400).json({ msg: "No Token Provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(400).json({ msg: "No Token Provided" });

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;

    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT Verify Error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const isAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });

  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

export const sameUserOrAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);

  if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

  if (!req.user) return res.status(401).json({ message: "Not authenticated" });

  if (req.user.id !== id && !req.user.isAdmin) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

// export const authenticate = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader?.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Missing token" });
//   }

//   const token = authHeader.split(" ")[1];
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded: any) => {
//     if (err) return res.status(403).json({ message: "Invalid or expired token" });
//     req.user = decoded.id; // אפשר לשים ב־req.userId
//     next();
//   });
// };
