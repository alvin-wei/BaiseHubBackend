// pageViewsRouter.js

const Router = require("koa-router");
const PageViewsService = require("./pageViewsService");

const pageViewsRouter = new Router();
const pageViewsService = new PageViewsService(/* Pass page views model here */);

pageViewsRouter.post("/page-views", async (ctx) => {
  const { pageIds, visitorId, viewTime } = ctx.request.body;
  try {
    const pageView = await pageViewsService.addPageView(
      pageIds,
      visitorId,
      viewTime
    );
    ctx.body = pageView;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

pageViewsRouter.get("/page-views/page/:pageId", async (ctx) => {
  const pageId = ctx.params.pageId;
  try {
    const pageViews = await pageViewsService.getPageViewsByPageId(pageId);
    ctx.body = pageViews;
  } catch (error) {
    ctx.status = 404;
    ctx.body = { error: error.message };
  }
});

pageViewsRouter.get("/page-views/visitor/:visitorId", async (ctx) => {
  const visitorId = ctx.params.visitorId;
  try {
    const pageViews = await pageViewsService.getPageViewsByVisitorId(visitorId);
    ctx.body = pageViews;
  } catch (error) {
    ctx.status = 404;
    ctx.body = { error: error.message };
  }
});

pageViewsRouter.get("/page-views/time/:startTime/:endTime", async (ctx) => {
  const startTime = new Date(ctx.params.startTime);
  const endTime = new Date(ctx.params.endTime);
  try {
    const pageViews = await pageViewsService.getPageViewsByViewTime(
      startTime,
      endTime
    );
    ctx.body = pageViews;
  } catch (error) {
    ctx.status = 404;
    ctx.body = { error: error.message };
  }
});

module.exports = pageViewsRouter;
