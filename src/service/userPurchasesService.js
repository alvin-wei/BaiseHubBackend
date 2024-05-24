// userPurchasesService.js

class UserPurchasesService {
  constructor(userPurchasesModel) {
    this.userPurchasesModel = userPurchasesModel;
  }

  async recordPurchase(userId, productId) {
    try {
      const purchaseRecord = await this.userPurchasesModel.create({
        user_id: userId,
        product_id: productId,
      });
      return purchaseRecord;
    } catch (error) {
      throw new Error(`Failed to record purchase: ${error.message}`);
    }
  }

  async getUserPurchasesByUserId(userId) {
    try {
      const userPurchases = await this.userPurchasesModel.findAll({
        where: { user_id: userId },
      });
      return userPurchases;
    } catch (error) {
      throw new Error(
        `Failed to get user purchases by user id: ${error.message}`
      );
    }
  }
}

module.exports = UserPurchasesService;
