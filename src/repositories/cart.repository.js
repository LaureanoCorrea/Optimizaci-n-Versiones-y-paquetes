class CartRepository {
  constructor(cartDao) {
    this.dao = cartDao;
  }

  get = async (filter) => {
    try {
      return await this.dao.get(filter);
    } catch (error) {
      throw new Error("Error al obtener los carritos");
    }
  };

  getById = async (filter, lean = false) => {
    try {
      return await this.dao.getById(filter, lean);
    } catch (error) {
      throw new Error(`Error obteniendo carrito: ${error.message}`);
    }
  };

  create = async (userEmail) => {
    try {
      return await this.dao.create(userEmail);
    } catch (error) {
      throw new Error(`Error creando carrito: ${error.message}`);
    }
  };

  update = async (cid, pid, nuevaCantidad) => {
    try {
      return await this.dao.update(cid, pid, nuevaCantidad);
    } catch (error) {
      throw new Error(`Error actualizando carrito: ${error.message}`);
    }
  };

  async updateCart(cartId, remainingProducts) {
    try {
      return await this.dao.updateCart(cartId, remainingProducts);
    } catch (error) {
      throw new Error(
        `Error updating cart with remaining products: ${error.message}`
      );
    }
  }

  addProduct = async (cid, pid, quantity) => {
    try {
      return await this.dao.add(cid, pid, quantity);
    } catch (error) {
      throw new Error(`Error añadiendo producto al carrito: ${error.message}`);
    }
  };

  deleteProduct = async (cid, pid) => {
    try {
      return await this.dao.removeFromCart(cid, pid);
    } catch (error) {
      throw new Error(
        `Error eliminando producto del carrito: ${error.message}`
      );
    }
  };

  deleteAll = async (cid) => {
    try {
      return await this.dao.removeAllFromCart(cid);
    } catch (error) {
      throw new Error(
        `Error eliminando producto del carrito: ${error.message}`
      );
    }
  };
}

export default CartRepository;
