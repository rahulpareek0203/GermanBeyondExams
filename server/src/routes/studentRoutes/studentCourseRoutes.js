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


router.get(
  "/my-courses",
  authenticate,
  async (req, res) => {
    try {
      const userId = req.user.id;

      const result = await pool.query(
        `
        SELECT 
          c.id,
          c.title,
          c.level,
          c.start_date,
          c.end_date
        FROM enrollments e
        JOIN courses c ON e.course_id = c.id
        WHERE e.user_id = $1
        AND e.status = 'approved'
        ORDER BY c.created_at DESC
        `,
        [userId]
      );

      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
);
export default router;