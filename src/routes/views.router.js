import { Router } from "express";
import UserManagerMongo from "../dao/Mongo/userManagerMongo.js";
import { passportCall } from "../middleware/passportCall.js";
import authorization from "../middleware/authentication.middleware.js";
import CartManagerMongo from "../dao/Mongo/cartsManagerMongo.js";
import ProductManagerMongo from "../dao/Mongo/productsManagerMongo.js";

const router = Router();
const userService = new UserManagerMongo();
const cartService = new CartManagerMongo();
const productService = new ProductManagerMongo();

router.get(
  "/products",
  passportCall(["jwt", "github"]),
  authorization(["admin", "user"]),
  async (req, res) => {
    const { limit = 10, page = 1, sort = "", query = "" } = req.query;

    try {
      const options = {
        limit,
        page,
        sort: sort || {},
        query,
        lean: true,
      };

      //extraer cart de las cookies
      const cartId = req.cookies.cartId;
      const userId = req.cookies.userId;
      // Utilizar el ID del carrito para realizar operaciones relacionadas con el carrito
      const cart = await cartService.getCartById(cartId);
      console.log("cart", cartId);
      const {
        docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page: currentPage,
      } = await productService.getProductsPaginated({}, options);

      const user = req.user;
      let username = req.user.first_name;
      const role = user ? user.role : "";

      res.render("products", {
        username,
        role,
        cartId,
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
  }
);

router.get("/chat", (req, res) => {
  res.render("chat", {
    style: "index.css",
  });
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productService.getProducts({});
    res.render("realTimeProducts", {
      productos: products,
      style: "index.css",
    });
  } catch (error) {
    console.log(error);
    res.json("Error al intentar obtener la lista de productos!");
    return;
  }
});

router.get(
  "/productDetails/:pid",
  passportCall(["jwt", "github"]),
  async (req, res) => {
    const { pid } = req.params;
    try {
      const product = await productService.getProduct(pid);

      const user = req.user;
      let username = req.user.first_name;
      const role = user ? user.role : "";

      const cartId = req.user.cart;
      console.log("cart req", req.user.cart);
      console.log("ide de usuario", req.user.id);

      res.render("productDetails", {
        username,
        role,
        cartId,
        userId: req.user.id,
        product,
        style: "index.css",
      });
      console.log("Valor de cartId:", cartId);
    } catch (error) {
      console.log(error);
      res.json("Error al intentar obtener el producto!");
      return;
    }
  }
);

router.get(
  "/product-added/:productId",
  passportCall(["jwt", "github"]),
  async (req, res) => {
    try {
      const { productId } = req.params;
      const pid = productId;
      const product = await productService.getProduct(pid);

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
  }
);

router.get("/cart", passportCall(["jwt", "github"]), async (req, res) => {
  try {
    const cartId = req.user.cart; // Obtener el ID del usuario en lugar del ID del carrito
    const cart = await cartService.getCartByIdLean(cartId);

    const username = req.user.first_name;
    const role = req.user.role;

    res.render("cart", {
      cartId,
      cart,
      username,
      role,
      style: "index.css",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/", (req, res) => {
  res.render("login", {
    style: "index.css",
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    style: "index.css",
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    style: "index.css",
  });
});
export default router;
