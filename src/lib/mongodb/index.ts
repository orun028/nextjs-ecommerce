import OnConnect from "./connect";
import ProductModel from "./model/product";
import CategoryModel from "./model/category";
import OrderModel from "./model/order";
import SupplierModel from "./model/supplier";
import UserModel from "./model/user";

const customMongoose = {OnConnect, ProductModel, CategoryModel, OrderModel, SupplierModel, UserModel};
export default customMongoose;
