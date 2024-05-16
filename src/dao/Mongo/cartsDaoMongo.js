import cartsModel from "./models/carts.model.js";

class CartDaoMongo {
  constructor() {
    this.cartsModel = cartsModel;
  }

  async get() {
    return await this.cartsModel.find({});
  }

  async getById(cid, lean = false) {
    return lean ? await this.cartsModel.findById(cid).lean() : await this.cartsModel.findById(cid);
  }

  async create({ userEmail }) {
    return this.cartsModel.create({ userEmail, products: [] });
  }

  async add(cid, pid, quantity) {
    const cart = await this.getById(cid);
    const existingProduct = cart.products.find(item => item.product.equals(pid));
    existingProduct 
      ? existingProduct.quantity += quantity
      : cart.products.push({ product: pid, quantity });
    await cart.save();
    return cart;
  }

  async update(cid, pid, nuevaCantidad) {
    return await this.cartsModel.findByIdAndUpdate(
      cid,
      { $set: { "products.$[elem].quantity": nuevaCantidad } },
      {
        new: true,
        arrayFilters: [{ "elem._id": pid }],
      }
    );
  }

  async updateCart(cartId, remainingProducts) {
    return await this.cartsModel.updateMany(
      { _id: cartId },
      { products: remainingProducts }
    )
  }

  async removeFromCart(cid, pid) {
    const cart = await this.getById(cid);
    cart.products = cart.products.filter(item => item._id.toString() !== pid.toString());
    await cart.save();
    return cart;
  }

  async removeAllFromCart(cid) {
    const cart = await this.getById(cid);
    cart.products = [];
    await cart.save();
    return cart;
  }

  async deleteCart(cid) {
    return await this.cartsModel.findByIdAndDelete(cid);
  }
  
}
export default CartDaoMongo;