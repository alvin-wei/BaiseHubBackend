// videoFavoritesService.js

class VideoFavoritesService {
  constructor(videoFavoritesModel) {
    this.videoFavoritesModel = videoFavoritesModel;
  }

  async favoriteVideo(videoId, userId) {
    try {
      const favorite = await this.videoFavoritesModel.create({
        video_id: videoId,
        user_id: userId,
      });
      return favorite;
    } catch (error) {
      throw new Error(`Failed to favorite video: ${error.message}`);
    }
  }

  async getUserFavoritesByVideoId(videoId) {
    try {
      const userFavorites = await this.videoFavoritesModel.findAll({
        where: { video_id: videoId },
      });
      return userFavorites;
    } catch (error) {
      throw new Error(
        `Failed to get user favorites by video id: ${error.message}`
      );
    }
  }

  async getFavoritesCountByVideoId(videoId) {
    try {
      const favoritesCount = await this.videoFavoritesModel.count({
        where: { video_id: videoId },
      });
      return favoritesCount;
    } catch (error) {
      throw new Error(
        `Failed to get favorites count by video id: ${error.message}`
      );
    }
  }
}

module.exports = VideoFavoritesService;
