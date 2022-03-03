import { model, Schema, models } from "mongoose";

const OrderSchema = new Schema({
    type: { type: String, required: true },
    promoCode: { 
      _id: { type: Schema.Types.ObjectId, ref: "promoCode" },
      type: String,
      value: String
     },
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
      _id: { type: Schema.Types.ObjectId, ref: "user", required: false},
      type: { type: String, required: true },
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    product: [{
      _id: { type: Schema.Types.ObjectId, ref: "product" },
      name: String,
      price: String,
      isSale: {
        type: { type: String, default: "percent" } /* or value */,
        value: { type: Number, default: 0 },
        end: { type: Date, default: new Date() },
      },
      image: String,
      quantity: { type: Number, required: true },
      category: [Schema.Types.ObjectId]
    }],
  }, { timestamps: true }
);

export default models.order || model("order", OrderSchema);
