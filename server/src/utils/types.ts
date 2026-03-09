import { Book } from "../entities/books";

export type CreateUserDetails = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserdetails = {
  name: string;
  email: string;
  password: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        isAdmin?: boolean; // אם אתה משתמש ב־isAdmin
      };
      book?: Book;
    }
  }
}
