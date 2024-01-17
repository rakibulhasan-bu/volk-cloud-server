import { Schema } from "mongoose";

export interface TTag {
  name: string;
  isDeleted: boolean;
}

export interface TCourse {
  title: string;
  instructor: string;
  categoryId: Schema.Types.ObjectId;
  price: number;
  tags: TTag[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks: number;
  details: {
    level: string;
    description: string;
  };
  createdBy: Schema.Types.ObjectId;
}
