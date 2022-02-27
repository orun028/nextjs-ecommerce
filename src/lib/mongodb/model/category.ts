import { model, Schema, models } from "mongoose";

const CategorySchema = new Schema({
    products: { type: [Schema.Types.ObjectId], ref: 'product' },
    name: { type: String, required: true },
    slug: { type: String, required: true },
  }, { timestamps: true }
)

export default models.category || model("category", CategorySchema);
