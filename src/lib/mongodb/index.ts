import OnConnect from "./connect";
import ProductModel from "./model/product";
import CategoryModel from "./model/category";
import ImageModel from "./model/image";

const customMongoose = {OnConnect, ProductModel, CategoryModel, ImageModel};
export default customMongoose;
