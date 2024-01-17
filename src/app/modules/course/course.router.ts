import express from "express";
import { courseControllers } from "./course.controller";
import { courseValidation } from "./course.validation";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import USER_ROLE from "../user/user.const";

const courseRouter = express.Router();

courseRouter.post(
  "/course",
  auth(USER_ROLE.admin),
  validateRequest(courseValidation.createCourseValidationSchema),
  courseControllers.createCourse,
);

courseRouter.get("/courses", courseControllers.getAllCourse);

courseRouter.get(
  "/courses/:courseId/reviews",
  courseControllers.getCourseByIdWithReviews,
);

courseRouter.get("/course/best", courseControllers.getBestCourse);

courseRouter.put(
  "/courses/:courseId",
  auth(USER_ROLE.admin),
  validateRequest(courseValidation.updateCourseValidationSchema),
  courseControllers.updateCourse,
);

export default courseRouter;
