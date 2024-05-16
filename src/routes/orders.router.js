import { Router } from "express";
import { passportCall } from "../middleware/passportCall.js";
import OrdersController from "../controllers/orders.controller.js";

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.get("/", ordersController.getOrders);

ordersRouter.get("/:oid", ordersController.getOrderById);

ordersRouter.post("/", passportCall(['jwt', 'github']), ordersController.createOrder);  

ordersRouter.put("/:oid", passportCall(['jwt', 'github']), ordersController.updateOrder);

ordersRouter.delete("/:oid", passportCall(['jwt', 'github']), ordersController.deleteOrder);

export default ordersRouter