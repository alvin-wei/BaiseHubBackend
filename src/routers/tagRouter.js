// routes/tagRouter.js
const Router = require("koa-router");
const tagService = require("../service/tagService");

const tagRouter = new Router({
  prefix: "/tags",
});

tagRouter.get("/", async (ctx) => {
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
