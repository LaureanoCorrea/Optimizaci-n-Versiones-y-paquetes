import { Router } from "express";
import ProductController from "../controllers/products.controller.js";
import { passportCall } from "../middleware/passportCall.js";


const productsRouter = Router();
const productController = new ProductController();

productsRouter.get('/',  productController.getProducts);

productsRouter.get('/productDetails/:pid',  productController.getProductDetails);

productsRouter.post('/',  productController.createProduct);

productsRouter.put('/:pid',  productController.updateProduct);

productsRouter.delete('/:pid',  productController.deleteProduct);


export default productsRouter;
