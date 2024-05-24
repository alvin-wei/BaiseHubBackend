// followersService.js

class FollowersService {
  constructor(followersModel) {
    this.followersModel = followersModel;
  }

  async follow(bloggerId, followerId) {
    try {
      const follow = await this.followersModel.create({
        blogger_id: bloggerId,
        follower_id: followerId,
      });
      return follow;
    } catch (error) {
      throw new Error(`Failed to follow: ${error.message}`);
    }
  }

  async unfollow(bloggerId, followerId) {
    try {
      const deletedCount = await this.followersModel.destroy({
        where: { blogger_id: bloggerId, follower_id: followerId },
      });
      return deletedCount;
    } catch (error) {
      throw new Error(`Failed to unfollow: ${error.message}`);
    }
  }

  async getFollowersByUserId(userId) {
    try {
      const followers = await this.followersModel.findAll({
        where: { blogger_id: userId },
      });
      return followers;
    } catch (error) {
      throw new Error(`Failed to get followers by user id: ${error.message}`);
    }
  }

  async getFollowingByUserId(userId) {
    try {
      const following = await this.followersModel.findAll({
        where: { follower_id: userId },
      });
      return following;
    } catch (error) {
      throw new Error(`Failed to get following by user id: ${error.message}`);
    }
  }
}

module.exports = FollowersService;
