// videoViewsService.js

class VideoViewsService {
  constructor(videoViewsModel) {
    this.videoViewsModel = videoViewsModel;
  }

  async addView(videoId, userId) {
    try {
      const view = await this.videoViewsModel.create({
        video_id: videoId,
        user_id: userId,
      });
      return view;
    } catch (error) {
      throw new Error(`Failed to add view: ${error.message}`);
    }
  }

  async getViewHistoryByUserId(userId) {
    try {
      const viewHistory = await this.videoViewsModel.findAll({
        where: { user_id: userId },
      });
      return viewHistory;
    } catch (error) {
      throw new Error(
        `Failed to get view history by user id: ${error.message}`
      );
    }
  }

  async getViewsCountByVideoId(videoId) {
    try {
      const viewsCount = await this.videoViewsModel.count({
        where: { video_id: videoId },
      });
      return viewsCount;
    } catch (error) {
      throw new Error(
        `Failed to get views count by video id: ${error.message}`
      );
    }
  }
}

module.exports = VideoViewsService;
