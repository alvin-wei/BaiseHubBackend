// videoAccessRouter.js

const Router = require("koa-router");
const VideoAccessService = require("./videoAccessService");

const videoAccessRouter = new Router();
const videoAccessService =
  new VideoAccessService(/* Pass videoAccess model here */);

videoAccessRouter.get("/video-access/:videoId", async (ctx) => {
  const videoId = ctx.params.videoId;
  try {
    const accessType = await videoAccessService.getVideoAccessType(videoId);
    if (accessType) {
      ctx.body = { access_type: accessType };
    } else {
      ctx.status = 404;
      ctx.body = { error: "Video access record not found" };
    }
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

module.exports = videoAccessRouter;
