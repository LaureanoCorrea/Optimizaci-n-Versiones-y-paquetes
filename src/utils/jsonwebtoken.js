import jwt from "jsonwebtoken";
import { configObject } from "../config/connectDB.js";

const { jwt_private_key } = configObject;

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      first_name: user.first_name,
      id: user.id,
      role: user.role,
      cart: user.cart
    },
    jwt_private_key,
    { expiresIn: "24h" }
  );
  console.log("token", token);
  return token;
};

export const authTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send('token invalid');
  
  const token = authHeader.split(' ')[1]; // Bearer <token>
  console.log ("token", token);
  
  jwt.verify(token, jwt_private_key, (err, decodedUser) => {
    if (err) {
      return res.status(401).send('Unauthorized request');
    }
    req.user = decodedUser;
    next();
  });
};