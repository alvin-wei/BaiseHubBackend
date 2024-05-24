// adminActivityLogRouter.js

const Router = require("koa-router");
const AdminActivityLogService = require("./adminActivityLogService");

const adminActivityLogRouter = new Router();
const adminActivityLogService =
  new AdminActivityLogService(/* Pass adminActivityLog model here */);

adminActivityLogRouter.post("/admin-activity-log", async (ctx) => {
  const { adminId, action, role } = ctx.request.body;
  try {
    await adminActivityLogService.addActivityLog(adminId, action, role);
    ctx.status = 200;
    ctx.body = { message: "Admin activity log added successfully" };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

module.exports = adminActivityLogRouter;
