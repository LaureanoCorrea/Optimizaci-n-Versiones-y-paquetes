import { Router } from "express";
import usersModel from "../dao/models/users.model.js";
import UserManagerMongo from "../dao/Mongo/userManagerMongo.js";
import CartManagerMongo from "../dao/Mongo/cartsManagerMongo.js";

const usersRouter = Router();
const userService = new UserManagerMongo();
const cartService = new CartManagerMongo();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await userService.getUser({});
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

usersRouter.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const newUser = await userService.createUser({
      first_name,
      last_name,
      email,
      password,
    });

    const newCart = await cartService.createCart({ products: [] }); // Asumiendo que tienes una referencia al usuario en el modelo de carrito
    await userService.updateUser(newUser._id, { cartID: newCart._id });

    res.status(200).send({
      status: "success",
      message: `El usuario ${first_name} ${last_name} ha sido creado con éxito`,
      user: newUser,
      cart: newCart,
    });
  } catch (error) {
    console.log(error);
  }
});

usersRouter.get("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await userService.getUser({ _id: uid });
    res.json({
      status: "success",
      message: `Usuario ${user.first_name} ${user.last_name} id "${uid}" encontrado`,
      result: user,
    });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

usersRouter.put("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const userToUpdate = req.body;

    const result = await userService.updateUser(uid, userToUpdate); //se usa para mostrar el usuario actualizado en tiempo real, dado que el sistema tenderá a mostrarnos el usuario actualizado pero sin actualizar
    res.status(200).send({
      status: "success",
      message: `El usuario ${result.first_name} ${result.last_name} con id "${uid}" ha sido actualizado`,
      result: result,
    });
  } catch (error) {
    console.log(error);
  }
});

usersRouter.delete("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const result = await userService.deleteUser(uid);
    res.status(200).send({
      status: "success",
      message: `El usuario ${result.first_name} ${result.last_name} con id ${result._id} ha sido eliminado`,
    });
  } catch (error) {
    console.log(error);
  }
});

export default usersRouter;
