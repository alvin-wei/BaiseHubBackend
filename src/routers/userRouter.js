// routes/userRouter.js
const Router = require("koa-router");
const userService = require("../service/userService");

const userRouter = new Router({
  prefix: "/users",
});

userRouter.post("/register", async (ctx) => {
  try {
    const { username, email, password, fullName, avatarUrl, phoneNumber } =
      ctx.request.body;
    const user = await userService.registerUser({
      username,
      email,
      password,
      fullName,
      avatarUrl,
      phoneNumber,
    });
    ctx.body = user;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

userRouter.post("/login", async (ctx) => {
  try {
    const { email, password } = ctx.request.body;
    const isValid = await userService.verifyPassword(email, password);
    if (!isValid) {
      ctx.status = 401;
      ctx.body = { error: "Invalid email or password" };
      return;
    }
    const user = await userService.loginUser(email);
    ctx.body = user;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

userRouter.post("/change-password", async (ctx) => {
  try {
    const { email, newPassword } = ctx.request.body;
    const user = await userService.changePassword(email, newPassword);
    ctx.body = user;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

module.exports = userRouter;
