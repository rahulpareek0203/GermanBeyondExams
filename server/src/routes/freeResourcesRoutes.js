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
        pdf_link
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

export default router;