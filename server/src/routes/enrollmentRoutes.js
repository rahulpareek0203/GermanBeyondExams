import express from "express";
import authenticate from "../middleware/authenticate.js";
import {pool} from "../db.js";

const router = express.Router();


/*
  1️⃣ CREATE ENROLLMENT (User clicks Join)
*/

router.post("/", authenticate, async(req, res) => {
    try{
        const {courseId} = req.body;
        const userId = req.user.id;

        //check if already requested or enrolled
        const existing = await pool.query(
            `SELECT * FROM enrollments
            WHERE user_id = $1 AND course_id = $2`, [userId, courseId]
        );

        if(existing.rows.length > 0){
            return res.status(400).json({
                message: "Already requested or enrolled"
            })
        }

        // Insert as pending
        await pool.query(
        `INSERT INTO enrollments (user_id, course_id, status)
        VALUES ($1, $2, 'pending')`,
        [userId, courseId]
        );

        res.json({ message: "Request submitted successfully" });
    }
    catch (error){
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// user checks their status
router.get("/status/:courseId", authenticate, async (req, res) => {
    try {
        const userId = req.user.id;
        const { courseId } = req.params;

        const result = await pool.query(
            `SELECT status FROM enrollments
            WHERE user_id = $1 AND course_id = $2`,
            [userId, courseId]
        );

        if(result.rows.length === 0){
            return res.json({ status: null})
        }
        res.json({ status: result.rows[0].status });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

export default router;