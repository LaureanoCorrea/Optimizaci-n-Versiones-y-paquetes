import { Router } from "express";
import ViewController from "../controllers/views.controller.js";
import { passportCall } from "../middleware/passportCall.js";
import authorization from "../middleware/authentication.middleware.js";

const router = Router();

router.get("/", ViewController.login);
router.get("/login", ViewController.login);
router.get("/register", ViewController.register);
router.get("/cart/:cid", passportCall(["jwt"]), ViewController.cart);
router.get(
  "/chat",
  passportCall(["jwt"]),
  authorization(["user"]),
  ViewController.chat
);
router.get(
  "/products",
  passportCall(["jwt"]),
  authorization(["admin", "user"]),
  ViewController.products
);
router.get("/realtimeproducts", ViewController.realtimeProducts);
router.get(
  "/productDetails/:pid",
  passportCall(["jwt"]),
  ViewController.productDetails
);
router.get(
  "/product-added/:pid",
  passportCall(["jwt"]),
  ViewController.productAdded
);

router.get(
  "/current",
  passportCall(["jwt"]),
  authorization(["user", "admin"]),
  ViewController.current
);

export default router;
