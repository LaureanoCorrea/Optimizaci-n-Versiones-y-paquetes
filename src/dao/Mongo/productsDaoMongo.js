import productsModel from "./models/products.model.js";

class ProductDaoMongo {
  constructor() {
    this.productsModel = productsModel;
  }

  async get(filter, options) {
    return await this.productsModel.paginate(filter, options);
  }
  
  async getById(pid) {
    return await this.productsModel.findOne({ _id: pid }).lean();
  }

  async create(newProduct) {
    return await this.productsModel.create(newProduct);
  }

  async update(pid) {
    return await this.productsModel.updateOne({ _id: pid });
  }

  async updateStock(pid, newStock) {
    return await this.productsModel.updateOne({ _id: pid }, { stock: newStock });
  }

  async delete(pid) {
    return await this.productsModel.deleteOne({ _id: pid });
  }
}
export default ProductDaoMongo;
