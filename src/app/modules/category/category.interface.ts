import { Schema } from "mongoose";

export interface TCategory {
  name: string;
  createdBy: Schema.Types.ObjectId;
}
