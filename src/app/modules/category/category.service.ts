import { TCategory } from "./category.interface";
import Category from "./category.model";

const createCategoryIntoDB = async (category: TCategory) => {
  return await Category.create(category);
};

const getAllCategoryFromDB = async () => {
  const result = await Category.find().populate({
    path: "createdBy",
    select: "_id username email role",
  });
  return {
    categories: result,
  };
};

export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
};
