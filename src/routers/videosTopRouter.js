// videosTopRouter.js

const Router = require("koa-router");
const VideosTopService = require("./videosTopService");

const videosTopRouter = new Router();
const videosTopService = new VideosTopService(/* Pass videos top model here */);

videosTopRouter.post("/videos-top", async (ctx) => {
  const { videoId, rank } = ctx.request.body;
  try {
    const videoTop = await videosTopService.addVideoToTop(videoId, rank);
    ctx.body = videoTop;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

videosTopRouter.get("/videos-top/:videoId", async (ctx) => {
  const videoId = parseInt(ctx.params.videoId);
  try {
    const videoTopRank = await videosTopService.getVideoTopRank(videoId);
    ctx.body = { rank: videoTopRank };
  } catch (error) {
    ctx.status = 404;
    ctx.body = { error: error.message };
  }
});

videosTopRouter.put("/videos-top/:videoId", async (ctx) => {
  const videoId = parseInt(ctx.params.videoId);
  const { newRank } = ctx.request.body;
  try {
    const updatedVideoTop = await videosTopService.updateVideoTopRank(
      videoId,
      newRank
    );
    ctx.body = updatedVideoTop;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

videosTopRouter.delete("/videos-top/:videoId", async (ctx) => {
  const videoId = parseInt(ctx.params.videoId);
  try {
    await videosTopService.removeVideoFromTop(videoId);
    ctx.body = { message: "Video removed from top successfully" };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

module.exports = videosTopRouter;
