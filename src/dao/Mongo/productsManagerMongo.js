import productsModel from "../models/products.model.js";

class ProductManagerMongo {
  constructor() {
    this.productsModel = productsModel;
  }

  async getProductsPaginated(filter, options) {
    const { limit, page, sort } = options;

    try {
      const result = await this.productsModel.paginate(filter, {
        ...options,
        lean: true,
      });

      return result;
    } catch (error) {
      throw new Error("Error al obtener productos paginados");
    }
  }
  async getProducts() {
    return await this.productsModel.find({});
  }

  async getProduct(pid) {
    return await this.productsModel.findOne({ _id: pid }).lean();
  }

  async createProducts(newProduct) {
    return await this.productsModel.create(newProduct);
  }

  async updateProduct(pid) {
    return await this.productsModel.updateOne({ _id: pid });
  }

  async deleteProduct(pid) {
    return await this.productsModel.deleteOne({ _id: pid });
  }
}
export default ProductManagerMongo;



//   async getProductsPaginated(filter, options) {
//     const { limit, page, sort } = options;

//     try {
//       const result = await this.productsModel.paginate(filter, {
//         ...options,
//         lean: true,
//       });

//       return result;
//     } catch (error) {
//       throw new Error("Error al obtener productos paginados");
//     }
//   }
//   async getProducts() {
//     return await this.productsModel.find({});
//   }

//   async getProduct(pid) {
//     return await this.productsModel.findOne({ _id: pid }).lean();
//   }

//   async createProduct(newProduct) {
//     return await this.productsModel.create(newProduct);
//   }

//   async updateProduct(pid, productToUpdate) {
//     return await this.productsModel.findByIdAndUpdate({ _id: pid }, productToUpdate, { new: true });
//   }

//   async deleteProduct(pid) {
//     return await this.productsModel.findByIdAndDelete({ _id: pid });
//   }
// }
// export default ProductManagerMongo;
