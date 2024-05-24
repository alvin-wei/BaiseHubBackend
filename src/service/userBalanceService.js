// userBalanceService.js

class UserBalanceService {
  constructor(userBalanceModel) {
    this.userBalanceModel = userBalanceModel;
  }

  async createUserBalance(userId, initialBalance = 0) {
    try {
      const userBalance = await this.userBalanceModel.create({
        user_id: userId,
        balance: initialBalance,
      });
      return userBalance;
    } catch (error) {
      throw new Error(`Failed to create user balance: ${error.message}`);
    }
  }

  async getUserBalance(userId) {
    try {
      const userBalance = await this.userBalanceModel.findOne({
        where: { user_id: userId },
      });
      return userBalance;
    } catch (error) {
      throw new Error(`Failed to retrieve user balance: ${error.message}`);
    }
  }

  async updateUserBalance(userId, newBalance) {
    try {
      const updatedUserBalance = await this.userBalanceModel.update(
        { balance: newBalance },
        { where: { user_id: userId } }
      );
      return updatedUserBalance;
    } catch (error) {
      throw new Error(`Failed to update user balance: ${error.message}`);
    }
  }

  async deleteUserBalance(userId) {
    try {
      const deletedRowsCount = await this.userBalanceModel.destroy({
        where: { user_id: userId },
      });
      if (deletedRowsCount === 0) {
        throw new Error("User balance not found");
      }
    } catch (error) {
      throw new Error(`Failed to delete user balance: ${error.message}`);
    }
  }
}

module.exports = UserBalanceService;
