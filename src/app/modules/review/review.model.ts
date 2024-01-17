import { Schema, model } from "mongoose";

import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    rating: { type: Number },
    review: { type: String },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Review = model<TReview>("Review", reviewSchema);

export default Review;
