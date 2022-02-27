import { model, Schema, models } from "mongoose";

const SupplierSchema = new Schema({ 
    name: {type: String, required: true},
    url: {type: String, required: false},
    address: [{
        road: String,
        district: String,
        city: String
    }],
    des: {type: String, required: false},
    products: {type: [Schema.Types.ObjectId], ref: 'Product'},
}, { timestamps: true});

export default models.supplier || model("supplier", SupplierSchema);
