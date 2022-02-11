import { model, Schema, connection, Model, models } from "mongoose";

const Category = new Schema({
    products: { type: [Schema.Types.ObjectId], ref: 'Products' },
    name: { type: String, require: true },
    slug: { type: String, require: true },
  }, { timestamps: true }
)

/* if (process.env.NODE_ENV === "development") {
  delete connection.models["Category"];
} */

export default models.category || model("category", Category);
