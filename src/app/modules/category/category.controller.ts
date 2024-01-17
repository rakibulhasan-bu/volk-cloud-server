import { Request, Response } from "express";
import { CatchAsyncError } from "../../utils/CatchAsyncError";
import { categoryServices } from "./category.service";

const createCategory = CatchAsyncError(async (req: Request, res: Response) => {
  const category = req.body;
  category.createdBy = req.user._id;

  const result = await categoryServices.createCategoryIntoDB(category);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Category created successfully",
    data: result,
  });
});

const getAllCategory = CatchAsyncError(async (req: Request, res: Response) => {
  const result = await categoryServices.getAllCategoryFromDB();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Categories retrieved successfully",
    data: result,
  });
});

export const categoryController = {
  createCategory,
  getAllCategory,
};
