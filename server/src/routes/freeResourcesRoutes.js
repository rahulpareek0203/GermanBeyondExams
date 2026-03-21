import express from "express";
import { pool } from "../db.js";

const router = express.Router();

/**
 * GET all free resources
 */
router.get("/free-resources", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        title,
        TO_CHAR(resource_date, 'DD Mon YYYY') as date,
        pdf_link,
        reel_link
      FROM free_resources
      ORDER BY resource_date DESC
    `);

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});


/**
 * GET single resource by id
 */
router.get("/free-resources/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const result = await pool.query(
      `SELECT * FROM free_resources WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch resource" });
  }
});


router.post("/verify-code", async (req, res) => {
  try {
    const { code, resourceId, userId } = req.body;

    // 1. Get correct code from DB
    const resource = await pool.query(
      `SELECT access_code FROM free_resources WHERE id = $1`,
      [resourceId]
    );

    if (resource.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }

    const correctCode = resource.rows[0].access_code;

    // 2. Check code
    if (correctCode !== code) {
      return res.status(401).json({ message: "Wrong code" });
    }

    // 3. Save unlock (avoid duplicates)
    await pool.query(
      `
      INSERT INTO user_resources (user_id, resource_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, resource_id) DO NOTHING
      `,
      [userId, resourceId]
    );

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Verification failed" });
  }
});


router.get("/user/unlocked-resources/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `
      SELECT resource_id 
      FROM user_resources 
      WHERE user_id = $1
      `,
      [userId]
    );

    const unlocked = result.rows.map(r => r.resource_id);

    res.json(unlocked);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch unlocked resources" });
  }
});

export default router;