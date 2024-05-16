import { Router } from "express";
import MockingController from "../controllers/mocking.controller.js";

const mockingProductsRouter = Router();
const mockingController = new MockingController();

mockingProductsRouter.get("/", mockingController.generateMockingProducts);

export default mockingProductsRouter