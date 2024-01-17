import { Request, Response } from "express";
import { reviewService } from "./review.services";
import { CatchAsyncError } from "../../utils/CatchAsyncError";
import { courseServices } from "../course/course.service";
import AppError from "../../error/AppError";

const createReview = CatchAsyncError(async (req: Request, res: Response) => {
  const review = req.body;
  review.createdBy = req.user._id;

  const isCourseExist = await courseServices.getSingleCourseById(
    review?.courseId,
  );
  if (!isCourseExist) {
    throw new AppError(404, "Course id not valid!");
  }

  const result = await reviewService.createReviewIntoDB(review);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Review created successfully",
    data: result,
  });
});

export const reviewController = {
  createReview,
};
