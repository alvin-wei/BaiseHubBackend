// videoLikesRouter.js

const Router = require("koa-router");
const VideoLikesService = require("./videoLikesService");

const videoLikesRouter = new Router();
const videoLikesService =
  new VideoLikesService(/* Pass videoLikes model here */);

videoLikesRouter.post("/like-video", async (ctx) => {
  const { videoId, userId } = ctx.request.body;
  try {
    const like = await videoLikesService.likeVideo(videoId, userId);
    ctx.body = like;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

videoLikesRouter.get("/user-likes/:videoId", async (ctx) => {
  const videoId = ctx.params.videoId;
  try {
    const userLikes = await videoLikesService.getUserLikesByVideoId(videoId);
    ctx.body = userLikes;
  } catch (error) {
    ctx.status = 404;
    ctx.body = { error: error.message };
  }
});

videoLikesRouter.get("/likes-count/:videoId", async (ctx) => {
  const videoId = ctx.params.videoId;
  try {
    const likesCount = await videoLikesService.getLikesCountByVideoId(videoId);
    ctx.body = { likesCount: likesCount };
  } catch (error) {
    ctx.status = 404;
    ctx.body = { error: error.message };
  }
});

module.exports = videoLikesRouter;
