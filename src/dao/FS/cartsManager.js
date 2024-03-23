const { promises: fs } = require("fs");

class CartManager {
  constructor() {
    this.path = "./src/jsonDB/Carts.json";
  }

  async readFile() {
    try {
      const dataCarts = await fs.readFile(this.path, "utf-8");
      return JSON.parse(dataCarts);
    } catch (error) {
      return [];
    }
  }

  async createCart() {
    try {
      const carts = await this.readFile();
      let newCart = {
        id: carts.length + 1,
        products: [],
      };
      carts.push(newCart);
      await fs.writeFile(this.path, JSON.stringify(carts, null, 2, "utf - 8"));
      return newCart;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(cid) {
    try {
      const carts = await this.readFile();
      const cart = carts.find((cart) => cart.id === cid);
      if (!cart) {
        return "Producto no encontrado";
      }
      return cart;
    } catch (error) {
      console.log(error);
    }
    return this.cart;
  }
  async addProduct(cid, pid) {
    const carts = await this.readFile();
    const cartIndex = carts.findIndex((cart) => cart.id === cid);

    if (cartIndex === -1) {
      return { status: "error", message: "Carrito no encontrado" };
    }

    const productIndex = carts[cartIndex].products.findIndex(
      (product) => product.product === pid
    );
    if (productIndex === -1) {
      carts[cartIndex].products.push({
        product: pid,
        quantity: 1,
      });
    } else {
      carts[cartIndex].products[productIndex].quantity += 1;
    }
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2, "utf - 8"));
    return carts[cartIndex];
  }
}

module.exports = CartManager;
