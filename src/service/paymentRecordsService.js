// paymentRecordsService.js

class PaymentRecordsService {
  constructor(paymentRecordsModel) {
    this.paymentRecordsModel = paymentRecordsModel;
  }

  async recordPayment(userId, amount) {
    try {
      const paymentRecord = await this.paymentRecordsModel.create({
        user_id: userId,
        amount: amount,
      });
      return paymentRecord;
    } catch (error) {
      throw new Error(`Failed to record payment: ${error.message}`);
    }
  }

  async getPaymentRecordsByUserId(userId) {
    try {
      const paymentRecords = await this.paymentRecordsModel.findAll({
        where: { user_id: userId },
      });
      return paymentRecords;
    } catch (error) {
      throw new Error(
        `Failed to get payment records by user id: ${error.message}`
      );
    }
  }
}

module.exports = PaymentRecordsService;
