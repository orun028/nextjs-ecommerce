import { model, Schema, connection, Model, models } from "mongoose";

const Product =  new Schema({ 
   sku: { type: String, default: ''},
   status: { type: String, default: 'published'},/* 'published'||'not released' */
   slug: { type: String},
   name: { type: String, require: true},
   quantity: { type: Number, require: true},
   desMd: { type: String },
   desXl: { type: String },
   price: { type: Number, require: true},
   likeCounts: { type: Number, default: 0},
   buyCounts:  { type: Number, default: 0},
   viewCounts: { type: Number, default: 0},
   isSale: {
      status: {type: Boolean, default: false},
      type: {type: String, default: 'percent'}, /* or value */
      value: { type: Number, default: 0 },
      end: {type: Date, default: new Date}
   },
   size: {type: Number, default: 0},
   weight: {type: Number, default: 0},
   image: { 
      item: String, default: '',
      lib: [String]
   },
   category: { type: [Schema.Types.ObjectId], ref: 'Categorys', required: false}
   // supplier: { type: [Mongoose.Schema.Types.ObjectId], ref: Supplier, required: false},
}, { timestamps: true})

/* if (process.env.NODE_ENV==='development') {
	delete connection.models['Product'];
} */

export default models.product || model("product",Product);
