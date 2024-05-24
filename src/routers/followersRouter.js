// followersRouter.js

const Router = require("koa-router");
const FollowersService = require("./followersService");

const followersRouter = new Router();
const followersService = new FollowersService(/* Pass followers model here */);

followersRouter.post("/follow", async (ctx) => {
  const { bloggerId, followerId } = ctx.request.body;
  try {
    const follow = await followersService.follow(bloggerId, followerId);
    ctx.body = follow;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

followersRouter.post("/unfollow", async (ctx) => {
  const { bloggerId, followerId } = ctx.request.body;
  try {
    const deletedCount = await followersService.unfollow(bloggerId, followerId);
    ctx.body = { deletedCount: deletedCount };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

followersRouter.get("/followers/:userId", async (ctx) => {
  const userId = ctx.params.userId;
  try {
    const followers = await followersService.getFollowersByUserId(userId);
    ctx.body = followers;
  } catch (error) {
    ctx.status = 404;
    ctx.body = { error: error.message };
  }
});

followersRouter.get("/following/:userId", async (ctx) => {
  const userId = ctx.params.userId;
  try {
    const following = await followersService.getFollowingByUserId(userId);
    ctx.body = following;
  } catch (error) {
    ctx.status = 404;
    ctx.body = { error: error.message };
  }
});

module.exports = followersRouter;
