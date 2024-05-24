// videosTopService.js

class VideosTopService {
  constructor(videosTopModel) {
    this.videosTopModel = videosTopModel;
  }

  async addVideoToTop(videoId, rank = 9999) {
    try {
      const videoTop = await this.videosTopModel.create({
        video_id: videoId,
        rank: rank,
      });
      return videoTop;
    } catch (error) {
      throw new Error(`Failed to add video to top: ${error.message}`);
    }
  }

  async getVideoTopRank(videoId) {
    try {
      const videoTop = await this.videosTopModel.findOne({
        where: { video_id: videoId },
      });
      return videoTop ? videoTop.rank : null;
    } catch (error) {
      throw new Error(`Failed to get video top rank: ${error.message}`);
    }
  }

  async updateVideoTopRank(videoId, newRank) {
    try {
      const updatedVideoTop = await this.videosTopModel.update(
        { rank: newRank },
        { where: { video_id: videoId } }
      );
      return updatedVideoTop;
    } catch (error) {
      throw new Error(`Failed to update video top rank: ${error.message}`);
    }
  }

  async removeVideoFromTop(videoId) {
    try {
      const deletedRowsCount = await this.videosTopModel.destroy({
        where: { video_id: videoId },
      });
      if (deletedRowsCount === 0) {
        throw new Error("Video top not found");
      }
    } catch (error) {
      throw new Error(`Failed to remove video from top: ${error.message}`);
    }
  }
}

module.exports = VideosTopService;
