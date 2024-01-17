import express from "express";
import { reviewController } from "./review.controller";
import validateRequest from "../../middleware/validateRequest";
import { reviewValidation } from "./review.validation";
import auth from "../../middleware/auth";
import USER_ROLE from "../user/user.const";
const reviewRouter = express.Router();

reviewRouter.post(
  "/reviews",
  auth(USER_ROLE.user),
  validateRequest(reviewValidation.reviewValidationSchema),
  reviewController.createReview,
);

export default reviewRouter;
