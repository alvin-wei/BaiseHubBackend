// commentsRouter.js

const Router = require("koa-router");
const CommentsService = require("./commentsService");

const commentsRouter = new Router();
const commentsService = new CommentsService(/* Pass comments model here */);

commentsRouter.post("/comments", async (ctx) => {
  const { videoId, userId, content, parentCommentId } = ctx.request.body;
  try {
    const comment = await commentsService.addComment(
      videoId,
      userId,
      content,
      parentCommentId
    );
    ctx.body = comment;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

commentsRouter.get("/comments/video/:videoId", async (ctx) => {
  const videoId = ctx.params.videoId;
  try {
    const comments = await commentsService.getCommentsByVideoId(videoId);
    ctx.body = comments;
  } catch (error) {
    ctx.status = 404;
    ctx.body = { error: error.message };
  }
});

commentsRouter.get("/comments/user/:userId", async (ctx) => {
  const userId = ctx.params.userId;
  try {
    const comments = await commentsService.getCommentsByUserId(userId);
    ctx.body = comments;
  } catch (error) {
    ctx.status = 404;
    ctx.body = { error: error.message };
  }
});

module.exports = commentsRouter;
