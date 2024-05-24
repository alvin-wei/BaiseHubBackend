// userPurchasesRouter.js

const Router = require("koa-router");
const UserPurchasesService = require("./userPurchasesService");

const userPurchasesRouter = new Router();
const userPurchasesService =
  new UserPurchasesService(/* Pass userPurchases model here */);

userPurchasesRouter.post("/record-purchase", async (ctx) => {
  const { userId, productId } = ctx.request.body;
  try {
    const purchaseRecord = await userPurchasesService.recordPurchase(
      userId,
      productId
    );
    ctx.body = purchaseRecord;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

userPurchasesRouter.get("/user-purchases/:userId", async (ctx) => {
  const userId = ctx.params.userId;
  try {
    const userPurchases = await userPurchasesService.getUserPurchasesByUserId(
      userId
    );
    ctx.body = userPurchases;
  } catch (error) {
    ctx.status = 404;
    ctx.body = { error: error.message };
  }
});

module.exports = userPurchasesRouter;
