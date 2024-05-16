import {
  cartService,
  productService,
  orderService,
} from "../repositories/index.js";

class CartController {
  constructor() {
    this.cartService = cartService;
    this.productService = productService;
    this.orderService = orderService;
  }

  async createCart(req, res) {
    try {
      const { products } = req.body;
      const newCart = await this.cartService.create({ products });

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
  }

  async add(req, res) {
    try {
      const { pid, quantity } = req.body;
      const cid = req.user.cart;

      const cart = await this.cartService.addProduct(cid, pid, quantity);
      res.status(200).json({
        status: "success",
        message: "Producto agregado al carrito exitosamente",
        cart,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Error interno del servidor al agregar el producto al carrito",
      });
    }
  }

  async getCart(req, res) {
    try {
      const cid = req.user.cart;
      const cart = await this.cartService.getById(cid);

      if (!cart) {
        return res.status(404).json({
          status: "error",
          message: "El carrito especificado no existe",
        });
      }

      res.render("cart", {
        cid, // Utilizar el ID del carrito obtenido
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
  }

  async update(req, res) {
    try {
      const { pid } = req.params;
      const { quantity } = req.body;
      const cid = req.user.cart;

      // Lógica para actualizar la cantidad del producto en el carrito
      const updatedCart = await this.cartService.update(cid, pid, quantity);

      res.status(200).json({
        status: "success",
        message: "Cantidad del producto actualizada exitosamente",
        updatedCart,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message:
          "Error interno del servidor al actualizar la cantidad del producto en el carrito",
      });
    }
  }

  async purchase(req, res) {
    const cid = req.user.cart;
    let total = 0;

    try {
      const cart = await this.cartService.getById(cid);

      if (!cart) {
        return res
          .status(404)
          .json({ status: "error", message: "Carrito no encontrado" });
      }

      const nonStock = [];
      const buyedProducts = [];

      // Verificar el stock de cada producto en el carrito
      for (const item of cart.products) {
        const pid = item.product._id;
        const quantity = item.quantity;

        // Obtener la información de stock del producto
        const stockInfo = await this.productService.getById(pid);
        const stock = stockInfo.stock;

        if (quantity > stock) {
          // Si no hay suficiente stock, agregamos el ID del producto a la lista de no comprados
          nonStock.push(pid);
        } else {
          const newStock = stock - quantity;
          // Si hay suficiente stock, restamos la cantidad comprada del stock del producto
          await this.productService.updateProductStock(pid, newStock);
          // Agregar el ID del producto a la lista de productos comprados
          buyedProducts.push(item._id);
          total += item.product.price * item.quantity;
        }
      }

      // Actualizar el carrito con los productos restantes
      const remainingProducts = cart.products.filter(
        (item) => !buyedProducts.includes(item._id)
      );
      await this.cartService.updateCart(cid, remainingProducts);

      if (nonStock.length > 0) {
        // Devolver el arreglo con los IDs de los productos que no pudieron procesarse
        return res.json({
          message: "Algunos productos no tienen suficiente stock",
          nonStock,
        });
      }

      if (buyedProducts.length > 0) {
        // Generar un ticket con los datos de la compra
        const ticketData = {
          purchaser: req.user.first_name,
          products: buyedProducts,
          total: total.toFixed(2),
          date: new Date(),
        };
        const ticket = await this.orderService.createOrder(ticketData);
        console.log("ticket controller", ticketData);

        // Eliminar productos comprados del carrito
        await this.cartService.deleteProduct(cid, buyedProducts);
      }

      // Devolver una respuesta exitosa
      return res.status(200).json({
        status: "success",
        message: "Compra completada exitosamente",
        cart,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Error interno del servidor al procesar la compra",
      });
    }
  }

  async removeFromCart(req, res) {
    const { pid } = req.params;
    const cid = req.user.cart;

    try {
      await this.cartService.deleteProduct(cid, pid);
      res.json({ message: "Producto eliminado del carrito correctamente" });
    } catch (error) {
      console.log(error);
    }
  }

  async removeAllFromCart(req, res) {
    const cid = req.user.cart;
    try {
      await this.cartService.deleteAll(cid);
      res.json({ message: "Carrito vaciado correctamente" });
    } catch (error) {
      console.log(error);
    }
  }
}

export default CartController;
