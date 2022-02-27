import { model, Schema, models } from "mongoose";

const PromoCodeSchema = new Schema({ 
    name: {type: String, required: true},
    status: {type: String, required: true, default: false},
    type: {type: String, required: true},
    value: {type: String, required: true},
    url: {type: String, required: false},
    des: {type: String, required: false},
}, { timestamps: true});

export default models.promoCode || model("promoCode", PromoCodeSchema);
