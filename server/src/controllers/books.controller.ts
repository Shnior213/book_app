import { Request, Response } from "express";
import UsersService from "../services/users.service";
import { CreateUserDetails, UpdateUserdetails } from "../utils/types";
import BooksService from "../services/books.service";
import { Review } from "../entities/reviews";

async function createBook(req: Request, res: Response) {
  console.log("CREATE BOOK CONTROLLER HIT");

  try {
    const { title, author /*, userId reviews */ } = req.body;

    const userId = req.user!.id;

    const imagePath = req.file?.path;

    if (!title || !author || !imagePath) {
      return res.status(400).json({
        message: "Missing fields",
        details: { title: !!title, author: !!author, image: !!imagePath },
      });
    }

    const book = await BooksService.createBook(
      title,
      author,
      userId,
      [],
      imagePath,
    );
    console.log("book created");
    
    return res.status(201).json(book);
  } catch (err) {
    console.error("CREATE BOOK ERROR:", err);

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
    const { title, author, userId, reviews } = req.body;

    const imageUrl = req.file?.path;
    const book = await BooksService.updateBook(
      id,
      title,
      author,
      userId,
      reviews,
      imageUrl,
    );

    res.json(book);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function deleteBook(req: Request, res: Response) {
  try {
    const book = await BooksService.deleteBook(Number(req.params.id));
    res.json("Book deleted");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function readedBook(req: Request, res: Response) {
  const bookId = Number(req.params.id);
  const userId = req.user!.id;

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
