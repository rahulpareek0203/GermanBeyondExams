import express from "express";
import { pool } from "../../db.js"
import authenticate from "../../middleware/authenticate.js";
import authorizeRole from "../../middleware/authorizeRole.js";

const router = express.Router();

/* GET ALL COURSES */
router.get("/", authenticate, authorizeRole("admin"), async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM courses ORDER BY created_at DESC"
    );
    res.json(result.rows);
    console.log(">>> message from backend in /admin/coursesRoutes.js for fetched courses list:", result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* CREATE COURSE */
router.post("/", authenticate, authorizeRole("admin"), async (req, res) => {
  const { title, level, status, start_date, end_date } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO courses (title, level, status, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, level, status || "active", start_date, end_date]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* DELETE COURSE */
router.delete("/:id", authenticate, authorizeRole("admin"), async (req, res) => {
  try {
    await pool.query("DELETE FROM courses WHERE id = $1", [req.params.id]);
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;