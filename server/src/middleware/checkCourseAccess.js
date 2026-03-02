import {pool} from "../db.js";

const checkCourseAccess = async (req, res, next) => {
  const userId = req.user.id;
  const { courseId } = req.params;

  try {
    // 1️⃣ Check enrollment
    const enrollment = await pool.query(
      `SELECT * FROM enrollments
       WHERE user_id = $1
       AND course_id = $2
       AND status = 'approved'`,
      [userId, courseId]
    );

    if (enrollment.rows.length === 0) {
      return res.status(403).json({
        message: "You are not enrolled in this course"
      });
    }

    // 2️⃣ Check course status
    const course = await pool.query(
        `SELECT status
        FROM courses
        WHERE id = $1`,
        [courseId]
        );

    if (!course.rows.length) {
        return res.status(404).json({
            message: "Course not found"
        });
    }

    const { status } = course.rows[0];

    if (status !== "active") {
        return res.status(403).json({
            message: "Course is expired now"
        });
    }

    next();

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default checkCourseAccess;