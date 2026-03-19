import { Request, Response } from "express";
import UsersService from "../services/users.service";
import { CreateUserDetails, UpdateUserDetails } from "../types/users.types";
import BooksService from "../services/books.service";
import { Review } from "../entities/reviews";
import { CreateBookDetails, UpdateBookDetails } from "../types/books.types";

async function createBook(req: Request, res: Response) {
  try {
    const { title, author } = req.body;
    const userId = req.user!.id;
    const imagePath = req.file?.path;

    if (!title || !author || !imagePath || !userId) {
      return res.status(400).json({
        message: "Missing fields",
        details: {
          title: !!title,
          author: !!author,
          image: !!imagePath,
          userId: !!userId,
        },
      });
    }
    const createBookDetailes: CreateBookDetails = {
      ...req.body,
      image: imagePath,
      userId,
      reviews: [],
    };
    const book = await BooksService.createBook(createBookDetailes);

    return res.status(201).json(book);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function findBooks(req: Request, res: Response) {
  try {
    const books = await BooksService.findBooks();
    res.json(books);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function findBook(req: Request, res: Response) {
  try {
    const book = await BooksService.findBook(Number(req.params.id));
    res.json(book);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function updateBook(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid review ID" });
    }

    const updateBookDetails: UpdateBookDetails = {
      ...req.body,
      id,
      image: req.file?.path,
    };

    const book = await BooksService.updateBook(updateBookDetails);

    res.json(book);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function deleteBook(req: Request, res: Response) {
  try {
    await BooksService.deleteBook(Number(req.params.id));
    res.json("Book deleted");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function readedBook(req: Request, res: Response) {
  const bookId = Number(req.params.id);
  const userId = req.user!.id;

  if(!bookId){
    return res.status(400).json({ message: "bookId is required" });
  }

  try {
    const book = await BooksService.readedBook(bookId, userId);
    res.json(book);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

async function unReadedBook(req: Request, res: Response) {
  const bookId = Number(req.params.id);
  const userId = req.user!.id;

  if(!bookId){
    return res.status(400).json({ message: "bookId is required" });
  }
  try {
    const book = await BooksService.unReadedBook(bookId, userId);
    res.json(book);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export default {
  createBook,
  findBooks,
  findBook,
  updateBook,
  deleteBook,
  readedBook,
  unReadedBook,
};
