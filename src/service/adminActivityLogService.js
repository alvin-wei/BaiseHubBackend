// adminActivityLogService.js

class AdminActivityLogService {
  constructor(adminActivityLogModel) {
    this.adminActivityLogModel = adminActivityLogModel;
  }

  async addActivityLog(adminId, action, role) {
    try {
      await this.adminActivityLogModel.create({
        admin_id: adminId,
        action: action,
        role: role,
      });
    } catch (error) {
      throw new Error(`Failed to add admin activity log: ${error.message}`);
    }
  }
}

module.exports = AdminActivityLogService;
