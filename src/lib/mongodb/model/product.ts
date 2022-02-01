import Mongoose from "mongoose";

const ProductSchema = new Mongoose.Schema({ 
   sku: { type: String, default: ''},
   status: { type: String, default: 'published'},/* 'published'||'not released' */
   slug: { type: String},
   name: { type: String, require: true},
   quantity: { type: Number, require: true},
   des: { type: String },
   price: { type: Number, require: true},
   likeCounts: { type: Number, default: 0},
   buyCounts:  { type: Number, default: 0},
   viewCounts: { type: Number, default: 0},
   isSale: {
      status: {type: Boolean, default: false},
      percent: {type: Number, default: 0},
      end: {type: Date, default: new Date}
   },
   size: {type: Number, default: 0},
   weight: {type: Number, default: 0},
    /* image: { type: mongoose.Schema.Types.ObjectId, ref: Image, required: false},
    category: { type: [mongoose.Schema.Types.ObjectId], ref: Image, required: false},
    supplier: { type: [mongoose.Schema.Types.ObjectId], ref: Image, required: false}, */
}, { timestamps: true});

if (process.env.NODE_ENV==='development') {
	delete Mongoose.connection.models['Product'];
}

export default Mongoose.model("Product", ProductSchema);
