// service/userService.js
const pool = require("../config/db");
const bcrypt = require("bcrypt");

class UserService {
  constructor() {
    this.pool = pool;
  }

  async registerUser({
    username,
    email,
    password,
    fullName,
    avatarUrl,
    phoneNumber,
  }) {
    const client = await this.pool.connect();
    try {
      const passwordHash = await bcrypt.hash(password, 10);
      const res = await client.query(
        `INSERT INTO Users (username, email, password_hash, full_name, avatar_url, phone_number) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [username, email, passwordHash, fullName, avatarUrl, phoneNumber]
      );
      return res.rows[0];
    } catch (err) {
      console.error("Error registering user:", err);
      throw new Error("Failed to register user");
    } finally {
      client.release();
    }
  }

  async verifyPassword(email, password) {
    const client = await this.pool.connect();
    try {
      const res = await client.query(
        `SELECT password_hash FROM Users WHERE email = $1`,
        [email]
      );
      if (res.rows.length === 0) {
        throw new Error("User not found");
      }
      const isValid = await bcrypt.compare(password, res.rows[0].password_hash);
      return isValid;
    } catch (err) {
      console.error("Error verifying password:", err);
      throw new Error("Failed to verify password");
    } finally {
      client.release();
    }
  }

  async loginUser(email) {
    const client = await this.pool.connect();
    try {
      const res = await client.query(
        `UPDATE Users SET login_count = login_count + 1, last_login = CURRENT_TIMESTAMP WHERE email = $1 RETURNING *`,
        [email]
      );
      return res.rows[0];
    } catch (err) {
      console.error("Error logging in user:", err);
      throw new Error("Failed to log in user");
    } finally {
      client.release();
    }
  }

  async changePassword(email, newPassword) {
    const client = await this.pool.connect();
    try {
      const newPasswordHash = await bcrypt.hash(newPassword, 10);
      const res = await client.query(
        `UPDATE Users SET password_hash = $1 WHERE email = $2 RETURNING *`,
        [newPasswordHash, email]
      );
      return res.rows[0];
    } catch (err) {
      console.error("Error changing password:", err);
      throw new Error("Failed to change password");
    } finally {
      client.release();
    }
  }
}

module.exports = new UserService();
