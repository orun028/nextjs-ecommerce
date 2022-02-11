import { model, Schema, models } from "mongoose";

const Category = new Schema(
  {
    name: { type: String, require: true },
    slug: { type: String, require: true },
    width: { type: String },
    height: { type: String },
    size: { type: String },
  },
  { timestamps: true }
);

export default models.category || model("category", Category);
