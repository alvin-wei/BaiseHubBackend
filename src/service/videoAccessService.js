// videoAccessService.js

class VideoAccessService {
  constructor(videoAccessModel) {
    this.videoAccessModel = videoAccessModel;
  }

  async getVideoAccessType(videoId) {
    try {
      const videoAccessRecord = await this.videoAccessModel.findOne({
        where: { video_id: videoId },
      });
      return videoAccessRecord ? videoAccessRecord.access_type : null;
    } catch (error) {
      throw new Error(`Failed to get video access type: ${error.message}`);
    }
  }
}

module.exports = VideoAccessService;
