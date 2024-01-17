import AppError from "../../error/AppError";
import Category from "../category/category.model";
import { TCourse } from "./course.interface";
import Course from "./course.model";

const createCourse = async (course: TCourse) => {
  const isCategoryIdValid = await Category.findById(course.categoryId);
  if (!isCategoryIdValid) {
    throw new AppError(400, `${course.categoryId} is not a valid Category ID!`);
  }
  return await Course.create(course);
};

const getAllCourse = async (query: Record<string, unknown>) => {
  const {
    page = 1,
    limit = 10,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
  } = query;

  const searchOptions: Record<string, unknown> = {};

  if (language) {
    searchOptions.language = language;
  }
  if (provider) {
    searchOptions.provider = provider;
  }
  if (durationInWeeks) {
    searchOptions.durationInWeeks = durationInWeeks;
  }
  if (level) {
    searchOptions["details.level"] = level;
  }
  if (tags) {
    searchOptions["tags.name"] = tags;
  }
  if (startDate && endDate) {
    searchOptions.startDate = { $gte: startDate, $lte: endDate };
  }
  if (minPrice && maxPrice) {
    searchOptions.price = { $gte: minPrice, $lte: maxPrice };
  }
  let sortOptions = {};
  if (sortBy) {
    sortOptions = { [sortBy as string]: 1 };
  }
  if (sortOrder === "asc" || sortOrder === "desc") {
    sortOptions = sortOrder === "asc" ? { createdAt: 1 } : { createdAt: -1 };
  }
  const skip = (Number(page) - 1) * Number(limit);
  const result = await Course.find(searchOptions)
    .populate("createdBy")
    .sort(sortOptions)
    .skip(skip)
    .limit(Number(limit))
    .exec();

  const total = await Course.countDocuments(searchOptions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: {
      courses: result,
    },
  };
};

const getSingleCourseById = async (courseId: string) => {
  return await Course.findById(courseId).populate({
    path: "createdBy",
    select: "_id username email role",
  });
};

const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const { tags, details, ...remainingData } = payload;
  const modifiedData: Record<string, unknown> = { ...remainingData };

  if (tags && Object.keys(tags).length) {
    for (const [key, value] of Object.entries(tags)) {
      modifiedData[`tags.${key}`] = value;
    }
  }
  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedData[`details.${key}`] = value;
    }
  }

  return await Course.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  }).populate({
    path: "createdBy",
    select: "_id username email role",
  });
};

export const courseServices = {
  createCourse,
  getAllCourse,
  getSingleCourseById,
  updateCourse,
};
