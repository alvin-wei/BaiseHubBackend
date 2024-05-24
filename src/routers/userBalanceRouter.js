// userBalanceRouter.js

const Router = require("koa-router");
const UserBalanceService = require("./userBalanceService");

const userBalanceRouter = new Router();
const userBalanceService =
  new UserBalanceService(/* Pass user balance model here */);

userBalanceRouter.post("/user-balances", async (ctx) => {
  const { userId, initialBalance } = ctx.request.body;
  try {
    const userBalance = await userBalanceService.createUserBalance(
      userId,
      initialBalance
    );
    ctx.body = userBalance;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

userBalanceRouter.get("/user-balances/:userId", async (ctx) => {
  const userId = parseInt(ctx.params.userId);
  try {
    const userBalance = await userBalanceService.getUserBalance(userId);
    ctx.body = userBalance;
  } catch (error) {
    ctx.status = 404;
    ctx.body = { error: error.message };
  }
});

userBalanceRouter.put("/user-balances/:userId", async (ctx) => {
  const userId = parseInt(ctx.params.userId);
  const { newBalance } = ctx.request.body;
  try {
    const updatedUserBalance = await userBalanceService.updateUserBalance(
      userId,
      newBalance
    );
    ctx.body = updatedUserBalance;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

userBalanceRouter.delete("/user-balances/:userId", async (ctx) => {
  const userId = parseInt(ctx.params.userId);
  try {
    await userBalanceService.deleteUserBalance(userId);
    ctx.body = { message: "User balance deleted successfully" };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

module.exports = userBalanceRouter;
