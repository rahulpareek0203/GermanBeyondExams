import express from "express";
import {pool} from "../../db.js";
import authenticate from "../../middleware/authenticate.js";
import checkCourseAccess from "../../middleware/checkCourseAccess.js";

const router = express.Router();

router.get("/:courseId/materials",
  authenticate,
  checkCourseAccess,
  async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT * FROM course_materials
         WHERE course_id = $1
         ORDER BY material_date ASC`,
        [req.params.courseId]
      );

      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;