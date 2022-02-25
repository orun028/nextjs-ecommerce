import { model, Schema, models } from "mongoose";

const Category = new Schema({
    type: {type: String, required: true},
    promoCode: {type: Schema.Types.ObjectId, ref: 'PromoCode'},
    state: {type: String, default: 'new'},
    total: {type: Number, require: true},
    shipping: {
        state: {type: String, require: true},
        start: {type: Date},
        end: {type: Date}
    },
    payment: {type: String, require: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', require: true},
    products: { type: [Schema.Types.ObjectId], ref: 'Products' },
  }, { timestamps: true }
)

export default models.category || model("category", Category);
