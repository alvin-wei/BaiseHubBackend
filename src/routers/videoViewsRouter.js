// videoViewsRouter.js

const Router = require("koa-router");
const VideoViewsService = require("./videoViewsService");

const videoViewsRouter = new Router();
const videoViewsService =
  new VideoViewsService(/* Pass videoViews model here */);

videoViewsRouter.post("/add-view", async (ctx) => {
  const { videoId, userId } = ctx.request.body;
  try {
    const view = await videoViewsService.addView(videoId, userId);
    ctx.body = view;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

videoViewsRouter.get("/view-history/:userId", async (ctx) => {
  const userId = ctx.params.userId;
  try {
    const viewHistory = await videoViewsService.getViewHistoryByUserId(userId);
    ctx.body = viewHistory;
  } catch (error) {
    ctx.status = 404;
    ctx.body = { error: error.message };
  }
});

videoViewsRouter.get("/views-count/:videoId", async (ctx) => {
  const videoId = ctx.params.videoId;
  try {
    const viewsCount = await videoViewsService.getViewsCountByVideoId(videoId);
    ctx.body = { viewsCount: viewsCount };
  } catch (error) {
    ctx.status = 404;
    ctx.body = { error: error.message };
  }
});

module.exports = videoViewsRouter;
