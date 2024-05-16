import { Router } from "express";
import UserController from "../controllers/users.controller.js";

const router = Router();
const userController = new UserController();

router.get("/", userController.get);

router.post("/",userController.createUser);

router.get("/:uid", userController.get);

router.put("/:uid", userController.updateUser);

router.delete("/:uid", userController.deleteUser);

export default router;
