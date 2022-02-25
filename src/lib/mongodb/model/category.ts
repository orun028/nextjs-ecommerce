import { model, Schema, models } from "mongoose";

const Category = new Schema({
    products: { type: [Schema.Types.ObjectId], ref: 'Products' },
    name: { type: String, require: true },
    slug: { type: String, require: true },
  }, { timestamps: true }
)

export default models.category || model("category", Category);
