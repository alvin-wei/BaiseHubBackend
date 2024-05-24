// videoTagsRouter.js

const Router = require("koa-router");
const VideoTagsService = require("./videoTagsService");

const videoTagsRouter = new Router();
const videoTagsService = new VideoTagsService(/* Pass video tags model here */);

videoTagsRouter.post("/video-tags", async (ctx) => {
  const { videoId, tagId } = ctx.request.body;
  try {
    const videoTag = await videoTagsService.addVideoTag(videoId, tagId);
    ctx.body = videoTag;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

videoTagsRouter.get("/video-tags/video/:videoId", async (ctx) => {
  const videoId = ctx.params.videoId;
  try {
    const tags = await videoTagsService.getTagsByVideoId(videoId);
    ctx.body = tags;
  } catch (error) {
    ctx.status = 404;
    ctx.body = { error: error.message };
  }
});

videoTagsRouter.get("/video-tags/tag/:tagId", async (ctx) => {
  const tagId = ctx.params.tagId;
  try {
    const videos = await videoTagsService.getVideosByTagId(tagId);
    ctx.body = videos;
  } catch (error) {
    ctx.status = 404;
    ctx.body = { error: error.message };
  }
});

module.exports = videoTagsRouter;
