import { Router } from "express";
import { passportCall } from "../middleware/passportCall.js";
import CartController from "../controllers/carts.controller.js";

const cartsRouter = Router();
const cartController = new CartController();

cartsRouter.post("/",  cartController.createCart.bind(cartController));

cartsRouter.post("/add", passportCall(['jwt', 'github']),  cartController.add.bind(cartController));

cartsRouter.post("/:cid/purchase", passportCall(['jwt', 'github']),  cartController.purchase.bind(cartController));

cartsRouter.get("/cart/:cid", passportCall(['jwt', 'github']),  cartController.getCart.bind(cartController));

cartsRouter.put("/:pid", passportCall(['jwt', 'github']),  cartController.update.bind(cartController));

cartsRouter.delete('/errase/:pid', passportCall(['jwt', 'github']),  cartController.removeFromCart.bind(cartController));

cartsRouter.delete('/vaciar', passportCall(['jwt', 'github']),  cartController.removeAllFromCart.bind(cartController));

export default cartsRouter;
