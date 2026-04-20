import { Book } from "../entities/books";
import { AppDataSource } from "../data-source";
import { Review } from "../entities/reviews";
import { User } from "../entities/users";
import { CreateBookDetails, UpdateBookDetails } from "../schemas/book.schema";
import { Category } from "../entities/category";

const bookRepo = AppDataSource.getRepository(Book);
const userRepo = AppDataSource.getRepository(User);
const categoryRepo = AppDataSource.getRepository(Category);

async function createBook(createBookDetails: CreateBookDetails) {
  const { title, author, userId, reviews, image, categoryIds } =
    createBookDetails;

  const user = await userRepo.findOneBy({ id: userId });
  if (!user) throw new Error("User not found");

  let categories: Category[] = [];
  if (categoryIds && categoryIds.length > 0) {
    categories = await categoryRepo
      .createQueryBuilder("category")
      .where("category.id IN (:...ids)", { ids: categoryIds })
      .getMany();
  }

  const book = bookRepo.create({
    title,
    author,
    addedBy: user,
    image,
    reviews,
    categories,
  });

  return await bookRepo.save(book);
}

async function findBooks() {
  const books = await bookRepo.find({
    relations: {
      readByUsers: true,
      reviews: true,
      addedBy: true,
      categories: true,
    },
  });
  if (!books) throw new Error("books Not Found");

  return books;
}

async function findBook(id: number) {
  const book = await bookRepo.findOne({
    where: { id },
    relations: {
      readByUsers: true,
      reviews: { user: true },
      addedBy: true,
      categories: true,
    },
  });
  if (!book) throw new Error("books Not Found");
  return book;
}

async function updateBook(updateBookDetails: UpdateBookDetails) {
  const { id, title, author, userId, reviews, image, categoryIds } =
    updateBookDetails;

  const book = await bookRepo.findOne({
    where: { id },
    relations: { reviews: true, addedBy: true, categories: true },
  });
  if (!book) throw new Error("Book not found");

  if (title && book.title !== title) {
    const duplicate = await bookRepo.existsBy({ title });
    if (duplicate) throw new Error("Title already exists");
    book.title = title;
  }

  const user = await userRepo.findOneBy({ id: userId });
  if (!user) throw new Error("User not found");

  const updateData: any = {};

  if (author) updateData.author = author;

  if (userId) {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");
    updateData.addedBy = user;
  }

  if (image) {
    updateData.image = image;
  }

  if (categoryIds) {
    const categories = await categoryRepo
      .createQueryBuilder("category")
      .where("category.id IN (:...ids)", { ids: categoryIds })
      .getMany();

    if (categories.length !== categoryIds.length) {
      throw new Error("One or more categories not found");
    }
    book.categories = categories;
  }

  bookRepo.merge(book, updateData);

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

async function addBookToCategory(categoryId: number, bookId: number) {
  const book = await bookRepo.findOne({
    where: { id: bookId },
    relations: { categories: true },
  });

  const category = await categoryRepo.findOneBy({ id: categoryId });

  if (!book || !category) {
    throw new Error("book or category not found");
  }

  const alreadyExists = book.categories?.some((c) => c.id === categoryId);

  if (!alreadyExists) {
    book.categories = [...(book.categories || []), category];
    await bookRepo.save(book);
    return { message: " category added", book };
  }
  return { message: " category already exists", book };
}

export default {
  createBook,
  findBooks,
  updateBook,
  findBook,
  deleteBook,
  readedBook,
  unReadedBook,
  addBookToCategory,
};
