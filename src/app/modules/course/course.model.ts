import { Schema, model } from "mongoose";
import { TCourse, TTag } from "./course.interface";

const TagSchema = new Schema<TTag>({
  name: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const CourseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    tags: [TagSchema],
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    durationInWeeks: {
      type: Number,
    },
    details: {
      level: {
        type: String,
        required: true,
        enum: ["Beginner", "Intermediate", "Advanced"],
      },
      description: {
        type: String,
        required: true,
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

CourseSchema.pre("save", async function () {
  const startDate: Date = new Date(this.startDate);
  const endDate: Date = new Date(this.endDate);

  // Subtract dates to get the difference in milliseconds.
  const differenceInMilliseconds: number =
    endDate.getTime() - startDate.getTime();

  this.durationInWeeks = Math.ceil(
    differenceInMilliseconds / (1000 * 60 * 60 * 24 * 7),
  );
});

const Course = model("Course", CourseSchema);

export default Course;
