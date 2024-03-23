import { Router } from "express";
import messagesModel from "../dao/models/messages.model.js";

const messagesRouter = Router();

messagesRouter.get("/", async (req, res) => {
  try {
    const messages = await messagesModel.find({});
    res.status(200).send({
      status: "success",
      message: "Colección de mensajes",
      result: messages,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
});

messagesRouter.post("/", async (req, res) => {
  try {
    const { user, message } = req.body;
    const newMessage = {
      user,
      message,
    };
    const messages = await messagesModel.create(newMessage);

    res.status(200).send({
      status: "success",
      message: "Colección de mensajes agregada con éxito",
      result: messages,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
});

messagesRouter.put("/:mid", async (req, res) => {
  try {
    const { mid } = req.params;
    const newMessageData = req.body;

    const originalMessage = await messagesModel.findById(mid);
    let newMessage;
    try {
      newMessage = JSON.parse(newMessageData.message);
    } catch (error) {
      newMessage = newMessageData.message;
    }

    originalMessage.message += "\n" + newMessage;

    const result = await originalMessage.save();

    res.status(200).send({
      status: "success",
      message: `Chat de usuario ${result.user} actualizado`,
      result: result,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
});

export default messagesRouter;
