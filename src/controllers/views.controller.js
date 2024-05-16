import UserDaoMongo from "../dao/Mongo/userDaoMongo.js";
import CartDaoMongo from "../dao/Mongo/cartsDaoMongo.js";
import ProductDaoMongo from "../dao/Mongo/productsDaoMongo.js";
import CurrentDTO from "../dto/currentDTO.js";
import { faker } from "@faker-js/faker";

const userService = new UserDaoMongo();
const cartService = new CartDaoMongo();
const productService = new ProductDaoMongo();

const ViewController = {
  login: (req, res) => {
    res.render("login", {
      style: "index.css",
    });
  },

  register: (req, res) => {
    res.render("register", {
      style: "index.css",
    });
  },

  cart: async (req, res) => {
    try {
      const cid = req.user.cart;
      const cart = await cartService.getById(cid, true);
      const username = req.user.first_name;
      const role = req.user.role;
      res.render("cart", {
        cid,
        cart,
        username,
        role,
        style: "index.css",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  },

  products: async (req, res) => {
    const { limit = 5, page = 1, sort = "", query = "" } = req.query;

    try {
      const options = {
        limit,
        page,
        sort: sort || {},
        query,
        lean: true,
      };

      const cid = req.user.cart;
      const cart = await cartService.getById(cid);

      const {
        docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page: currentPage,
      } = await productService.get({}, options);

      const user = req.user;
      const username = req.user.first_name;
      const role = user ? user.role : "";

      res.render("products", {
        username,
        role,
        cid,
        products: docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page: currentPage,
        userId: req.user.id,
        style: "index.css",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  },

  chat: (req, res) => {
    res.render("chat", {
      style: "index.css",
    });
  },

  realtimeProducts: async (req, res) => {
    try {
      const products = await productService.getProduct({});
      res.render("realTimeProducts", {
        productos: products,
        style: "index.css",
      });
    } catch (error) {
      console.log(error);
      res.json("Error al intentar obtener la lista de productos!");
      return;
    }
  },

  productDetails: async (req, res) => {
    const { pid } = req.params;
    try {
      const product = await productService.getById(pid);

      const user = req.user;
      const username = req.user.first_name;
      const role = user ? user.role : "";
      const cid = req.user.cart;

      res.render("productDetails", {
        username,
        role,
        cid,
        userId: req.user.id,
        product,
        style: "index.css",
      });
    } catch (error) {
      console.log(error);
      res.json("Error al intentar obtener el producto!");
      return;
    }
  },

  productAdded: async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await productService.getById(pid);

      const username = req.user.first_name;
      const role = req.user.role;

      res.render("product-added", {
        username,
        role,
        product,
        style: "index.css",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Error interno del servidor",
      });
    }
  },

 
  current: async (req, res) => {
    try {
      const { first_name, last_name } = req.user;
      const currentDTO = new CurrentDTO({ first_name, last_name });
      res.send(currentDTO);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  },
};

export default ViewController;
