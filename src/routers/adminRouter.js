// adminRouter.js

const Router = require("koa-router");
const AdminService = require("./adminService");

const adminRouter = new Router();
const adminService = new AdminService(/* Pass admin model here */);

adminRouter.post("/admin/register", async (ctx) => {
  const { username, email, password, fullName, role } = ctx.request.body;
  try {
    const admin = await adminService.registerAdmin(
      username,
      email,
      password,
      fullName,
      role
    );
    ctx.body = admin;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

adminRouter.delete("/admin/:id", async (ctx) => {
  const adminId = ctx.params.id;
  try {
    const deletedAdmin = await adminService.deleteAdmin(adminId);
    ctx.body = deletedAdmin;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

adminRouter.put("/admin/login", async (ctx) => {
  const { username, password } = ctx.request.body;
  try {
    const isValidPassword = await adminService.verifyPassword(
      username,
      password
    );
    if (isValidPassword) {
      // Update last login time
      // const admin = await adminService.updateLastLogin(adminId); // You need to pass adminId
      ctx.body = { message: "Login successful" };
    } else {
      ctx.status = 401;
      ctx.body = { error: "Invalid credentials" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

module.exports = adminRouter;
