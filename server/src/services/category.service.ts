import { User } from "../entities/users";
import { Book } from "../entities/books";
import { AppDataSource } from "../data-source";
import { Category } from "../entities/category";
import {
  CreateCategoryDetails,
  UpdateCategoryDetails,
} from "../schemas/category.schema";

const categoryRepo = AppDataSource.getRepository(Category);
const bookRepo = AppDataSource.getRepository(Book);
// const userRepo = AppDataSource.getRepository(User);

async function createCategory(createCategoryDetails: CreateCategoryDetails) {
  const { name } = createCategoryDetails;

  const category = categoryRepo.create({ name });

  return await categoryRepo.save(category);
}

async function findCategories() {
  const categories = await categoryRepo.find({
    relations: { books: true },
  });
  if (!categories) throw new Error("categories Not Found");
  return categories;
}

async function findCategory(id: number) {
  const category = await categoryRepo.findOne({
    where: { id },
    relations: { books: true },
  });
  if (!category) throw new Error("category Not Found");
  return category;
}

async function updateCategory(updateCategoryDetails: UpdateCategoryDetails) {
  const { id, name, bookId } = updateCategoryDetails;
  const category = await categoryRepo.findOne({
    where: { id },
    relations: {
      books: true,
    },
  });
  if (!category) throw new Error("Category not found");

  const book = await bookRepo.findOneBy({ id: bookId });
  if (!!book) throw new Error("User  or Book not found");

  categoryRepo.merge(category, { name });

  return await categoryRepo.save(category);
}

async function deleteCategory(id: number) {
  const result = await categoryRepo.delete(id);
  return result;
}

export default {
  createCategory,
  findCategories,
  findCategory,
  updateCategory,
  deleteCategory,
};
