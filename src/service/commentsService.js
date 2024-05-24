// commentsService.js

class CommentsService {
  constructor(commentsModel) {
    this.commentsModel = commentsModel;
  }

  async addComment(videoId, userId, content, parentCommentId = null) {
    try {
      const comment = await this.commentsModel.create({
        video_id: videoId,
        user_id: userId,
        parent_comment_id: parentCommentId,
        content: content,
      });
      return comment;
    } catch (error) {
      throw new Error(`Failed to add comment: ${error.message}`);
    }
  }

  async getCommentsByVideoId(videoId) {
    try {
      const comments = await this.commentsModel.findAll({
        where: { video_id: videoId },
        include: [{ model: User }],
      });
      return comments;
    } catch (error) {
      throw new Error(`Failed to get comments by video id: ${error.message}`);
    }
  }

  async getCommentsByUserId(userId) {
    try {
      const comments = await this.commentsModel.findAll({
        where: { user_id: userId },
        include: [{ model: Video }],
      });
      return comments;
    } catch (error) {
      throw new Error(`Failed to get comments by user id: ${error.message}`);
    }
  }
}

module.exports = CommentsService;
