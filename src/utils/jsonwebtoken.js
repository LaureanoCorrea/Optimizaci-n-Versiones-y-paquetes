import jwt from "jsonwebtoken";
import { configObject } from "../config/connectDB.js";

const { jwt_private_key } = configObject;

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      first_name: user.first_name,
      role: user.role,
       cart: user.cart
    },
    jwt_private_key,
    { expiresIn: "24h" }
  );
  console.log("user", user);
  console.log("jwt", user.first_name);
  return token;
};

export const authTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).send("Unauthorized4 request");
  const token = authHeader.split(" ")[1]; //Bearer <token>

  jwt.verify(token, jwt_private_key, (err, decodeUser) => {
    if (err) {
      return res.status(401).send("Unauthorized5 request");
    }
    req.user = decodeUser;
    next();
  });
  console.log(jwt_private_key);
};
