import { connect } from "mongoose";
import dotenv from "dotenv";
import program from "../utils/commander.js";

const { mode } = program.opts();

dotenv.config({
  path: mode === "development" ? "./.env.development" : "./.env.production",
});

const configObject = {
  port: process.env.PORT || 8080,
  mongo_url: process.env.MONGO_URL,
  jwt_private_key: process.env.JWT_SECRET_KEY,
  modo: process.env.MODO
};

const connectDB = async () => {
  try {
    (await connect(process.env.MONGO_URL)) /
      console.log("Mongo Connected");
  } catch (error) {
    console.log(error);
  }
};
console.log("Opciones: ", configObject.modo);

export { connectDB, configObject };
