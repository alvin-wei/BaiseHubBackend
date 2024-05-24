// adminService.js

class AdminService {
  constructor(adminModel) {
    this.adminModel = adminModel;
  }

  async registerAdmin(username, email, password, fullName, role) {
    try {
      const admin = await this.adminModel.create({
        username,
        email,
        password_hash: password, // You should hash the password before saving it
        full_name: fullName,
        role,
      });
      return admin;
    } catch (error) {
      throw new Error("Failed to register admin");
    }
  }

  async deleteAdmin(adminId) {
    try {
      const deletedAdmin = await this.adminModel.destroy({
        where: { id: adminId },
      });
      return deletedAdmin;
    } catch (error) {
      throw new Error("Failed to delete admin");
    }
  }

  async updateLastLogin(adminId) {
    try {
      const updatedAdmin = await this.adminModel.update(
        { last_login: new Date() },
        { where: { id: adminId } }
      );
      return updatedAdmin;
    } catch (error) {
      throw new Error("Failed to update last login");
    }
  }

  async verifyPassword(username, password) {
    try {
      const admin = await this.adminModel.findOne({
        where: { username },
      });
      if (!admin) {
        return false; // Admin not found
      }
      // Logic to verify password hash
      return admin.password_hash === password;
    } catch (error) {
      throw new Error("Failed to verify password");
    }
  }
}

module.exports = AdminService;
