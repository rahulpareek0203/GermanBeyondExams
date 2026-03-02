import express from "express";
import { pool } from "../../db.js"
import authenticate from "../../middleware/authenticate.js";
import authorizeRole from "../../middleware/authorizeRole.js";

const router = express.Router();

/* GET MATERIALS BY COURSE */
router.get("/:courseId", authenticate, authorizeRole("admin"), async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM course_materials WHERE course_id = $1 ORDER BY material_date ASC",
      [req.params.courseId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ADD MATERIAL */
router.post("/:courseId", authenticate, authorizeRole("admin"), async (req, res) => {
  const { title, material_date, class_recording_link, notes_link, homework_link } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO course_materials
       (course_id, title, material_date, class_recording_link, notes_link, homework_link)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        req.params.courseId,
        title,
        material_date,
        class_recording_link,
        notes_link,
        homework_link
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* DELETE MATERIAL */
router.delete("/:id", authenticate, authorizeRole("admin"), async (req, res) => {
  try {
    await pool.query("DELETE FROM course_materials WHERE id = $1", [
      req.params.id
    ]);
    res.json({ message: "Material deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;