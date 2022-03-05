import ProductModel from "./model/product";
import CategoryModel from "./model/category";
import OrderModel from "./model/order";
import SupplierModel from "./model/supplier";
import UserModel from "./model/user";

export { default as OnConnect } from "./connect";
export { default as controll } from "./controller";
export const listModel = {
  product: ProductModel,
  category: CategoryModel,
  order: OrderModel,
  supplier: SupplierModel,
  user: UserModel,
};
