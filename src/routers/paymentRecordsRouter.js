// paymentRecordsRouter.js

const Router = require("koa-router");
const PaymentRecordsService = require("./paymentRecordsService");

const paymentRecordsRouter = new Router();
const paymentRecordsService =
  new PaymentRecordsService(/* Pass paymentRecords model here */);

paymentRecordsRouter.post("/record-payment", async (ctx) => {
  const { userId, amount } = ctx.request.body;
  try {
    const paymentRecord = await paymentRecordsService.recordPayment(
      userId,
      amount
    );
    ctx.body = paymentRecord;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

paymentRecordsRouter.get("/payment-records/:userId", async (ctx) => {
  const userId = ctx.params.userId;
  try {
    const paymentRecords =
      await paymentRecordsService.getPaymentRecordsByUserId(userId);
    ctx.body = paymentRecords;
  } catch (error) {
    ctx.status = 404;
    ctx.body = { error: error.message };
  }
});

module.exports = paymentRecordsRouter;
