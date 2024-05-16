class ProductRepository {
  constructor(productDao) {
    this.dao = productDao;
  }

  getProducts = async (filter = {}) => {
    try {
      const result = await this.dao.get(filter);
      return result;
    } catch (error) {
      throw new Error(`Error encontrando Productos: ${error.message}`);
    }
  };

  getById = async (pid) => {
    try {
      return await this.dao.getById(pid);
    } catch (error) {
      throw new Error(`Error encontrando ID producto: ${error.message}`);
    }
  };

  createProduct = async (newProduct) => {
    try {
      return await this.dao.create(newProduct);
    } catch (error) {
      throw new Error(`Error creando producto: ${error.message}`);
    }
  };

  updateProduct = async (pid, productToUpdate) => {
    try {
      return await this.dao.update(pid, productToUpdate);
    } catch (error) {
      throw new Error(`Error actualizando producto: ${error.message}`);
    }
  };

  async updateProductStock(pid, newStock) {
    try {
      return await this.dao.updateStock(pid, newStock);
    } catch (error) {
      throw new Error(`Error updating product stock: ${error.message}`);
    }
  }

  deleteProduct = async (pid) => {
    try {
      return await this.dao.delete(pid);
    } catch (error) {
      throw new Error(`Error eliminando producto: ${error.message}`);
    }
  };
}

export default ProductRepository;
