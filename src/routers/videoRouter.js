// routes/tagRouter.js
const Router = require("koa-router");
const videoService = require("../service/videoService");

const tagRouter = new Router({
  prefix: "/video",
});

tagRouter.get("/", async (ctx) => {
  try {
    const tags = await videoService.getAllTags();
    console.log(tags);
    ctx.body = tags;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

tagRouter.get("/covers", async (ctx) => {
  try {
    const tags = await tagService.getAllTags();
    console.log(tags);
    ctx.body = tags;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

module.exports = tagRouter;
