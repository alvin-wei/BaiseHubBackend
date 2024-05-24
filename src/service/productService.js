// productService.js

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  async createProduct(name, price, description, minimumFans, visibility) {
    try {
      const product = await this.productModel.create({
        name,
        price,
        description,
        minimum_fans: minimumFans,
        visibility,
      });
      return product;
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  }

  async getProductById(productId) {
    try {
      const product = await this.productModel.findOne({
        where: { id: productId },
      });
      return product;
    } catch (error) {
      throw new Error(`Failed to retrieve product: ${error.message}`);
    }
  }

  async updateProduct(productId, updateData) {
    try {
      const [updatedRowsCount, updatedProduct] = await this.productModel.update(
        updateData,
        {
          where: { id: productId },
          returning: true, // Return the updated product
        }
      );
      if (updatedRowsCount === 0) {
        throw new Error("Product not found");
      }
      return updatedProduct[0];
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }

  async deleteProduct(productId) {
    try {
      const deletedRowsCount = await this.productModel.destroy({
        where: { id: productId },
      });
      if (deletedRowsCount === 0) {
        throw new Error("Product not found");
      }
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }
}

module.exports = ProductService;
