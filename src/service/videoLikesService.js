// videoLikesService.js

class VideoLikesService {
  constructor(videoLikesModel) {
    this.videoLikesModel = videoLikesModel;
  }

  async likeVideo(videoId, userId) {
    try {
      const like = await this.videoLikesModel.create({
        video_id: videoId,
        user_id: userId,
      });
      return like;
    } catch (error) {
      throw new Error(`Failed to like video: ${error.message}`);
    }
  }

  async getUserLikesByVideoId(videoId) {
    try {
      const userLikes = await this.videoLikesModel.findAll({
        where: { video_id: videoId },
      });
      return userLikes;
    } catch (error) {
      throw new Error(`Failed to get user likes by video id: ${error.message}`);
    }
  }

  async getLikesCountByVideoId(videoId) {
    try {
      const likesCount = await this.videoLikesModel.count({
        where: { video_id: videoId },
      });
      return likesCount;
    } catch (error) {
      throw new Error(
        `Failed to get likes count by video id: ${error.message}`
      );
    }
  }
}

module.exports = VideoLikesService;
