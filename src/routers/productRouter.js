// productRouter.js

const Router = require("koa-router");
const ProductService = require("./productService");

const productRouter = new Router();
const productService = new ProductService(/* Pass product model here */);

productRouter.post("/products", async (ctx) => {
  const { name, price, description, minimumFans, visibility } =
    ctx.request.body;
  try {
    const product = await productService.createProduct(
      name,
      price,
      description,
      minimumFans,
      visibility
    );
    ctx.body = product;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

productRouter.get("/products/:id", async (ctx) => {
  const productId = parseInt(ctx.params.id);
  try {
    const product = await productService.getProductById(productId);
    ctx.body = product;
  } catch (error) {
    ctx.status = 404;
    ctx.body = { error: error.message };
  }
});

productRouter.put("/products/:id", async (ctx) => {
  const productId = parseInt(ctx.params.id);
  const updateData = ctx.request.body;
  try {
    const updatedProduct = await productService.updateProduct(
      productId,
      updateData
    );
    ctx.body = updatedProduct;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

productRouter.delete("/products/:id", async (ctx) => {
  const productId = parseInt(ctx.params.id);
  try {
    await productService.deleteProduct(productId);
    ctx.body = { message: "Product deleted successfully" };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

module.exports = productRouter;
