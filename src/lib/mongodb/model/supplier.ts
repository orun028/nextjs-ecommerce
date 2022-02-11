import Mongoose from "mongoose";
import Product from "./product";

const SupplierSchema = new Mongoose.Schema({ 
    name: {type: String, require: true},
    url: {type: String, required: false},
    address: [{
        road: String,
        district: String,
        city: String
    }],
    des: {type: String, required: false},
    products: {type: [Mongoose.Schema.Types.ObjectId], ref: Product},
}, { timestamps: true});

if (process.env.NODE_ENV==='development') {
	delete Mongoose.connection.models['Supplier'];
}

export default Mongoose.model("Supplier", SupplierSchema);
