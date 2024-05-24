const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
// const registerRouter = require('./routes/registerRouter');
const cors = require("@koa/cors");
const tagRouter = require("./src/routers/tagRouter");
const userRouter = require("./src/routers/userRouter");

const app = new Koa();
const router = new Router();

app.use(
  cors({
    origin: "*", // 允许所有的跨域请求
  })
);

// 处理 POST 请求体
app.use(bodyParser());

app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(tagRouter.routes()).use(tagRouter.allowedMethods());

// // 中间件：向 ctx.state 中添加数据库连接池
// app.use(async (ctx, next) => {
//   ctx.state.db = db;
//   await next();
// });

// // 使用用户认证中间件
// app.use(authenticateUser);

// // 注册业务路由
// app.use(userRouter.routes());

// // 示例需要认证的路由
// app.get("/protected-route", requireAuth, async (ctx) => {
//   ctx.body = { message: "You have access to this protected route" };
// });

app.use(router.routes());
app.listen(7000, () => console.log("Server running on port 7000"));
