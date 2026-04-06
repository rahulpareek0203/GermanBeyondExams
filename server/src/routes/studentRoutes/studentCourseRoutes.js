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


/* =========================================
   GET LEADERBOARD (COURSE-WISE)
========================================= */
router.get("/leaderboard/:courseId",
  authenticate,
  checkCourseAccess,
  async (req, res) => {
    const { courseId } = req.params;

    try {
      const result = await pool.query(
        `
        SELECT 
          u.id,
          u.full_name,

          SUM(er.total_score) AS total_score,
          SUM(er.total_max) AS total_max,

          ROUND(
            (SUM(er.total_score)::decimal / NULLIF(SUM(er.total_max), 0)) * 100,
            1
          ) AS percentage

        FROM exam_results er
        JOIN users u ON u.id = er.user_id

        WHERE er.course_id = $1

        GROUP BY u.id, u.full_name
        ORDER BY percentage DESC
        `,
        [courseId]
      );

      res.json(result.rows);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
);

/* =========================================
   GET RESULTS OF ONE STUDENT
========================================= */
router.get(
  "/my-results/:courseId",
  authenticate,
  checkCourseAccess,
  async (req, res) => {
    const userId = req.user.id;
    const { courseId } = req.params;

    try {
      const result = await pool.query(
        `
        SELECT *
        FROM exam_results
        WHERE user_id = $1
        AND course_id = $2
        ORDER BY created_at DESC
        `,
        [userId, courseId]
      );

      res.json(result.rows);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;