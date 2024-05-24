// videoTagsService.js

class VideoTagsService {
  constructor(videoTagsModel) {
    this.videoTagsModel = videoTagsModel;
  }

  async addVideoTag(videoId, tagId) {
    try {
      const videoTag = await this.videoTagsModel.create({
        video_id: videoId,
        tag_id: tagId,
      });
      return videoTag;
    } catch (error) {
      throw new Error(`Failed to add video tag: ${error.message}`);
    }
  }

  async getTagsByVideoId(videoId) {
    try {
      const tags = await this.videoTagsModel.findAll({
        where: { video_id: videoId },
        include: [{ model: Tag }],
      });
      return tags.map((tag) => tag.name);
    } catch (error) {
      throw new Error(`Failed to get tags by video id: ${error.message}`);
    }
  }

  async getVideosByTagId(tagId) {
    try {
      const videos = await this.videoTagsModel.findAll({
        where: { tag_id: tagId },
        include: [{ model: Video }],
      });
      return videos.map((video) => video.title);
    } catch (error) {
      throw new Error(`Failed to get videos by tag id: ${error.message}`);
    }
  }
}

module.exports = VideoTagsService;
