import { Book } from "../entities/books";
import { AppDataSource } from "../data-source";
import { Review } from "../entities/reviews";
import { User } from "../entities/users";
import { CreateBookDetails, UpdateBookDetails } from "../types/books.types";

const bookRepo = AppDataSource.getRepository(Book);
const userRepo = AppDataSource.getRepository(User);
const reviewRepo = AppDataSource.getRepository(Review);

async function createBook(createBookDetailes: CreateBookDetails) {
  const { title, author, userId, reviews, image } = createBookDetailes;

  const user = await userRepo.findOneBy({ id: userId });
  if (!user) throw new Error("User not found");

  const book = bookRepo.create({
    title,
    author,
    addedBy: user,
    image,
    reviews,
  });

  return await bookRepo.save(book);
}

async function findBooks() {
  const books = await bookRepo.find({
    relations: { readByUsers: true, reviews: true, addedBy: true },
  });
  if (!books) throw new Error("books Not Found");
  return books;
}

async function findBook(id: number) {
  const book = await bookRepo.findOne({
    where: { id },
    relations: { readByUsers: true, reviews: true, addedBy: true },
  });
  if (!book) throw new Error("books Not Found");
  return book;
}

async function updateBook(updateBookDetails: UpdateBookDetails) {
  const { id, title, author, userId, reviews, image } = updateBookDetails;

  const book = await bookRepo.findOne({
    where: { id },
    relations: { reviews: true, addedBy: true },
  });
  if (!book) throw new Error("Book not found");

  if (book.title !== title) {
    const duplicate = await bookRepo.existsBy({ title });
    if (duplicate) throw new Error("Title already exists");
    book.title = title;
  }

  const user = await userRepo.findOneBy({ id: userId });
  if (!user) throw new Error("User not found");

  bookRepo.merge(book, {
    author,
    addedBy: user,
    image,
  });

  return await bookRepo.save(book);
}

async function deleteBook(id: number) {
  const book = await bookRepo.findOneBy({ id });
  if (!book) throw new Error("Book not found");

  const result = await bookRepo.delete(id);
  return result;
}

async function readedBook(bookId: number, userId: number) {
  const book = await bookRepo.findOne({
    where: { id: bookId },
    relations: { readByUsers: true },
  });
  const user = await userRepo.findOneBy({ id: userId });

  if (!book || !user) throw new Error("Book or User not found");

  if (!book.readByUsers?.some((u) => u.id === user.id)) {
    book.readByUsers = [...(book.readByUsers || []), user];
    await bookRepo.save(book);
  }
  return book;
}

async function unReadedBook(bookId: number, userId: number) {
  const book = await bookRepo.findOne({
    where: { id: bookId },
    relations: { readByUsers: true },
  });
  if (!book) throw new Error("Book not found");

  book.readByUsers = book.readByUsers?.filter((u) => u.id !== userId) || [];
  await bookRepo.save(book);

  return book;
}

export default {
  createBook,
  findBooks,
  updateBook,
  findBook,
  deleteBook,
  readedBook,
  unReadedBook,
};
