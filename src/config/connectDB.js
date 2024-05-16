import dotenv from "dotenv";
import program from "../utils/commander.js";
import MongoSingleton from "./mongoSingleton.js";

const { mode } = program.opts();

dotenv.config({
  path: mode === "development" ? "./.env.development" : "./.env.production",
});

const configObject = {
  port:             process.env.PORT || 8080,
  mongo_url:        process.env.MONGO_URL,
  jwt_private_key:  process.env.JWT_SECRET_KEY,
  modo:             process.env.MODO,
  persistence:      process.env.PERSISTENCE,
  gmail_user:       process.env.GMAIL_USER_APP,
  gmail_pass:       process.env.GMAIL_PASS_APP,
  twilio_sid:       process.env.TWILIO_ACCOUNT_SID,
  twilio_token:     process.env.TWILIO_AUTH_TOKEN,
  twilio_phone:     process.env.TWILIO_PHONE_NUMBER
};

const connectDB = async () => {
  try {
    MongoSingleton.getInstance();
  } catch (error) {
    console.log(error);
  }
};
console.log("Opciones: ", configObject.modo);

export { connectDB, configObject };
