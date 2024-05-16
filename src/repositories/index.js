import { CartsDao, ProductDao, UserDao, OdersDao } from "../dao/factory.js";
import UserRepository from "./users.repository.js";
import CartRepository from "./cart.repository.js";
import ProductRepository from "./products.repository.js";
import OrderRepository from "./orders.repository.js";

const userService = new UserRepository(new UserDao());
const cartService = new CartRepository(new CartsDao());
const productService = new ProductRepository(new ProductDao());
const orderService = new OrderRepository(new OdersDao());

export { userService, cartService, productService, orderService }