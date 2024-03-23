import { Command } from "commander";
import dotenv from "dotenv";


const program = new Command();

const configObject = {
  port: process.env.PORT || 8080,
  jwt_private_key: process.env.JWT_SECRET_KEY,
};

program
  .option("--mode <mode>", "Modo de Uso del Servidor", "production")
  .parse();


export default program;
