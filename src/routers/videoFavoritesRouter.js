// videoFavoritesRouter.js

const Router = require("koa-router");
const VideoFavoritesService = require("./videoFavoritesService");

const videoFavoritesRouter = new Router();
const videoFavoritesService =
  new VideoFavoritesService(/* Pass videoFavorites model here */);

videoFavoritesRouter.post("/favorite-video", async (ctx) => {
  const { videoId, userId } = ctx.request.body;
  try {
    const favorite = await videoFavoritesService.favoriteVideo(videoId, userId);
    ctx.body = favorite;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

videoFavoritesRouter.get("/user-favorites/:videoId", async (ctx) => {
  const videoId = ctx.params.videoId;
  try {
    const userFavorites = await videoFavoritesService.getUserFavoritesByVideoId(
      videoId
    );
    ctx.body = userFavorites;
  } catch (error) {
    ctx.status = 404;
    ctx.body = { error: error.message };
  }
});

videoFavoritesRouter.get("/favorites-count/:videoId", async (ctx) => {
  const videoId = ctx.params.videoId;
  try {
    const favoritesCount =
      await videoFavoritesService.getFavoritesCountByVideoId(videoId);
    ctx.body = { favoritesCount: favoritesCount };
  } catch (error) {
    ctx.status = 404;
    ctx.body = { error: error.message };
  }
});

module.exports = videoFavoritesRouter;
