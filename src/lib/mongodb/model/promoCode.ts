import { model, Schema, models } from "mongoose";

const PromoCode = new Schema({ 
    name: {type: String, require: true},
    status: {type: String, require: true, default: false},
    type: {type: String, require: true},
    value: {type: String, require: true},
    url: {type: String, required: false},
    des: {type: String, required: false},
}, { timestamps: true});

export default models.promoCode || model("promoCode", PromoCode);
