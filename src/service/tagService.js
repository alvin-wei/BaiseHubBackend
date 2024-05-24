// service/tagService.js
const pool = require("../config/db");

class TagService {
  constructor() {
    this.pool = pool;
  }

  async getAllTags() {
    console.log("Attempting to connect to the database...");
    const client = await this.pool.connect().catch((err) => {
      console.error("Error acquiring client from pool:", err);
      throw new Error("Failed to connect to the database");
    });

    if (client) {
      console.log("Database connection acquired");
      try {
        const res = await client.query("SELECT * FROM Tags");
        console.log("Query Result:", res);
        return res.rows;
      } catch (err) {
        console.error("Error fetching tags:", err);
        throw new Error("Failed to fetch tags");
      } finally {
        client.release();
        console.log("Database connection released");
      }
    }
  }
}

module.exports = new TagService();
