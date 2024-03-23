const { promises: fs } = require("fs");

class ProductManager {
  constructor() {
    this.path = "./src/jsonDB/Products.json";
    this.products = [];
    this.loadProducts();
  }

  
    async saveProducts() {
      try {
        const data = JSON.stringify(this.products, null, 2);
        await fs.writeFile(this.path, data, 'utf-8');
      } catch (error) {
        console.error('Error al guardar productos:', error);
      }
    }
  
    validateProduct(product) {
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock
      ) {
        return "Todos los campos son obligatorios";
      }
      return null;
    }
  
    async addProduct(product) {
      try {
        await this.loadProducts();
        const productValidation = this.validateProduct(product);
        if (productValidation) {
          return productValidation;
        }
      } catch (error) {
        console.error(error);
        return "Error al agregar el producto";
        
      }
  
      const noRepeatCode = this.products.find(
        (prod) => prod.code === product.code
      );
      if (noRepeatCode) {
        return "Ya existe un producto con ese código";
      }
  
      const newProduct = {
        ...product,
        id: this.generateProductId(),
      };
      this.products.push(newProduct);
  
      await this.saveProducts();
  
      return "Producto agregado correctamente";
    }
  
    generateProductId() {
      return (
        (Math.max(
          ...(this.products ? this.products.map(prod => prod.id) : [0]),
          0
        ) + 1
      ));
    }
  
    async loadProducts() {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await fs.readFile(this.path, 'utf-8');
          this.products = JSON.parse(data);
          resolve();
        } catch (error) {
          if (error.code === 'ENOENT') {
            await this.saveProducts();
            resolve();
          } else {
            console.error('Error al cargar productos:', error);
            this.products = [];
            reject(error);
          }
        }
      });
    }
  
    getProducts(limit) {
      if (limit) {
        return this.products.slice(0, limit);
      }
      return this.products;
    }
  
    getProductById(id) {
      if (!this.products) {
        return "No hay productos";
      }
      const product = this.products.find(prod => prod.id === id);
      if (!product) {
        return "Producto no encontrado";
      }
      return product;
    }
  
    async updateProduct(id, updatedFields) {
      const index = this.products.findIndex(prod => prod.id === id);
      if (index === -1) {
        return "Producto no encontrado";
      }
  
      this.products[index] = {
        ...this.products[index],
        ...updatedFields,
        id: this.products[index].id, 
      };
  
      await this.saveProducts();
      return "Producto actualizado correctamente";
    }
  
    async deleteProduct(id) {
      const index = this.products.findIndex((prod) => prod.id === id);
      if (index === -1) {
        return "Producto no encontrado";
      }
  
      this.products.splice(index, 1);
  
      await this.saveProducts();
      return"Producto eliminado correctamente";
    }
  }
  
  module.exports = ProductManager;
  