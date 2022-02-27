import { model, Schema, models } from "mongoose";

const OrderSchema = new Schema({
    type: { type: String, required: true },
    promoCode: { type: Schema.Types.ObjectId, ref: "promoCode" },
    state: { type: String, default: "new" },
    total: { type: Number, required: true },
    shipPrice: { type: Number, required: true },
    shipping: {
      state: { type: Boolean, default: false },
      start: { type: Date },
      end: { type: Date },
    },
    payment: { type: String, required: true },
    userPay: {
      type: { type: String, required: true },
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    product: { type: [Schema.Types.ObjectId], ref: "product" },
  }, { timestamps: true }
);

export default models.order || model("order", OrderSchema);
