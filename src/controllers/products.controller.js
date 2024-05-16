import { productService } from "../repositories/index.js";
import CustomError from "../utils/errors/CustomErros.js";
import EErrors from "../utils/errors/enums.js";
import { generateProductsError } from "../utils/errors/info.js";

class ProductController {
  constructor() {
    this.service = productService;
  }

  getProducts = async (req, res) => {
    try {
      const { limit = 5, page = 1, sort = "", query = "" } = req.query;
      const options = {
        limit,
        page,
        lean: true,
      };
      console.log(options);

      if (sort === "asc" || sort === "desc") {
        options.sort = { price: sort === "asc" ? 1 : -1 };
      }

      const products = await this.service.getProducts({}, options);

      const response = {
        status: "success",
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage
          ? `/products?page=${products.prevPage}`
          : null,
        nextLink: products.hasNextPage
          ? `/products?page=${products.nextPage}`
          : null,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      res.status(500).json({
        status: "error",
        message: "Error interno del servidor",
      });
    }
  };

  getProductDetails = async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await this.service.getById(pid);

      if (!product) {
        return res.status(404).json({
          status: "error",
          message: "Producto no encontrado",
        });
      }

      res.render("productDetails", { product });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Error interno del servidor",
      });
    }
  };

  createProduct = async (req, res, next) => {
    try {
      const {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category,
      } = req.body;

      if (
        !title ||
        !description ||
        !price ||
        !thumbnail ||
        !code ||
        !stock ||
        !status ||
        !category
      ) {
        CustomError.createError({
          name: "Failed to create product",
          cause: generateProductsError({
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category,
          }),
          message: "Error to create product. Invalid properties.",
          code: EErrors.INVALID_FIELDS,
        });
      }

      const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category,
      };
      const result = await this.service.createProduct(newProduct);

      res.status(201).send({
        status: "success",
        message: `El producto de nombre ${newProduct.title} con código ${newProduct.code} ha sido agregado exitosamente`,
        result: result,
      });
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const productToUpdate = req.body;

      const result = await this.service.updateProduct(pid, productToUpdate);

      res.status(200).send({
        status: "succes",
        message: `El producto ${productToUpdate.title} con código ${productToUpdate.code} ha sido actualizado`,
        result: result,
      });
    } catch (error) {
      console.error("Error al intentar actualizar el producto", error);
      res.status(500).send({
        status: "error",
        message: "Error interno al actualizar el producto",
      });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const deleteProduct = await this.service.deleteProduct(pid);

      if (!deleteProduct) {
        return res.status(400).send({
          status: "Error",
          message: `El producto cuyo ID es "${pid}" no existe dentro del catálogo`,
          deleteProduct,
        });
      }

      return res.status(200).send({
        status: "succes",
        message: `El producto ${deleteProduct.title} de ID "${pid}" ha sido eliminado`,
      });
    } catch (error) {
      console.error("Error al intentar eliminar el producto:", error);
      res.status(500).send({
        status: error,
        message: "Error interno al intentar eliminar el producto",
      });
    }
  };
}

export default ProductController;
