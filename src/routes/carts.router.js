import { Router } from "express";
import cartsManagerMongo from "../dao/Mongo/cartsManagerMongo.js";
import { passportCall } from "../middleware/passportCall.js";
import UserManagerMongo from "../dao/Mongo/userManagerMongo.js";

const cartsRouter = Router();
const cartService = new cartsManagerMongo();
const userService = new UserManagerMongo();

cartsRouter.post("/", async (req, res) => {
  try {
    const { products } = req.body;
    const newCart = await cartService.createCart({ products });

    res.status(201).json({
      status: "success",
      message: 'Carrito agregado exitosamente "vacio"',
      cart: newCart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error interno del servidor",
    });
  }
});

cartsRouter.post("/add", passportCall (['jwt', 'github']), async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartId = req.user.cart;

    const cart = await cartService.addToCart(cartId, productId, quantity);
    res.status(200).json({
      status: "success",
      message: "Producto agregado al carrito exitosamente",
      cart,
  });
  } catch (error) {
    console.error(error);
    res.redirect(`/product-added/${productId}`); // Redirigir al usuario después de agregar el producto
  }
});

cartsRouter.get("/cart", passportCall(['jwt', 'github']), async (req, res) => {
  try {
    const cartId = req.user.cart;
    const cart = await cartService.getCartById(cartId);
    
    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "El carrito especificado no existe",
      });
    }

     res.render("cart", {
      cartId, // Utilizar el ID del carrito obtenido
      cart, // Pasar el carrito directamente como una propiedad
      style: "index.css",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error interno del servidor",
    });
  }
});

cartsRouter.put("/:productId", passportCall(['jwt', 'github']), async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const cartId = req.user.cart

    // Lógica para actualizar la cantidad del producto en el carrito en la base de datos
    const updatedCart = await cartService.updateCart(cartId, productId, quantity);

    res.status(200).json({
      status: "success",
      message: "Cantidad del producto actualizada exitosamente",
      updatedCart
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error interno del servidor al actualizar la cantidad del producto en el carrito"
    });
  }
});

cartsRouter.delete('/:cart/:productId', passportCall(['jwt', 'github']), async (req, res, next) => {
  const { productId } = req.params;
  const cartId = req.user.cart;
  console.log('idcart', cartId)
  try {
    await cartService.removeFromCart(cartId, productId);
    res.json({ message: 'Producto eliminado del carrito correctamente' });
  } catch (error) {
    next(error);
  }
});




// // cartsRouter.post("/cart/:cartId/:productId", passportCall(["jwt", "github"]), async (req, res) => {
// //   try {
// //     const userId = req.user.id;
// //     console.log('User ID:', userId);
// //     const productId = req.params.productId;
// //     const quantity = req.body.quantity || 1;

// //     const cart = await userService.getUserCartBy(userId);
// //     console.log('cart', cart)
// //     if (!cart) {
// //       console.log('No se encontró el carrito asociado al usuario');
// //       const newCart = await cartService.createCart({ products: [] });
// //       // Asociar el carrito recién creado con el usuario
// //       await userService.updateUserCart(userId, newCart._id);
// //       // Agregar el producto al carrito
// //       newCart.products.push({ product: productId, quantity });
// //       console.log('user', newCart)
// //       await newCart.save(); // Guardar el carrito actualizado en la base de datos
// //       res.redirect(`/product-added/${productId}`); // Redirigir al usuario después de agregar el producto
// //     } else {
// //       console.log('Carrito encontrado:', cart);
// //       // Si el carrito existe, simplemente agregar el producto al carrito
// //       cart.products.push({ product: productId, quantity });
// //       await cart.save(); // Guardar el carrito actualizado en la base de datos

// //       console.log(newCart)
// //       // res.redirect(`/product-added/${productId}`); // Redirigir al usuario después de agregar el producto
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Error interno del servidor" });
// //   }
// // });

// cartsRouter.delete(
//   "/cart/remove/:productId",
//   passportCall(["jwt", "github"]),
//   async (req, res) => {
//     try {
//       const userId = req.user.id;
//       const productId = req.params.productId;
//       await cartService.updateCart(userId, productId, -1);
//       res.sendStatus(204);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({
//         status: "error",
//         message: "Error interno del servidor",
//       });
//     }
//   }
// );

// cartsRouter.delete(
//   "/cart/clear",
//   passportCall(["jwt", "github"]),
//   async (req, res) => {
//     try {
//       const userId = req.user.id;
//       await cartService.deleteCart(userId);
//       res.sendStatus(204);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({
//         status: "error",
//         message: "Error interno del servidor",
//       });
//     }
//   }
// );

export default cartsRouter;
