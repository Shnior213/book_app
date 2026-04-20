import { Request, Response } from "express";
import CategoriesService from "../services/category.service";
import {
  CreateCategoryDetails,
  UpdateCategoryDetails,
} from "../schemas/category.schema";

async function createCategory(req: Request, res: Response) {
  try {
    const createCategoryDetails: CreateCategoryDetails = { ...req.body };

    const category = await CategoriesService.createCategory(
      createCategoryDetails,
    );
    res.status(201).json(category);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function findCategories(req: Request, res: Response) {
  try {
    const categories = await CategoriesService.findCategories();
    res.json(categories);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function findCategory(req: Request, res: Response) {
  try {
    const category = await CategoriesService.findCategory(
      Number(req.params.id),
    );
    res.json(category);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function updateCategory(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }
    const updateCategoryDetails: UpdateCategoryDetails = { ...req.body, id };
    const category = await CategoriesService.updateCategory(
      updateCategoryDetails,
    );
    res.json(category);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

async function deleteCategory(req: Request, res: Response) {
  try {
    await CategoriesService.deleteCategory(Number(req.params.id));
    res.json("category deleted");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(400).json({ message });
  }
}

export default {
  createCategory,
  findCategories,
  findCategory,
  updateCategory,
  deleteCategory,
};
