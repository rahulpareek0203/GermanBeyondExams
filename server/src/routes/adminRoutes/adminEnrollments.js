import express from "express"
import authenticate from "../../middleware/authenticate.js"
import { pool } from "../../db.js"

const router = express.Router()


/*
  1️⃣ GET ALL ENROLLMENTS
*/

router.get("/", authenticate, async(req, res) => {
    try {
        // 🔐 Admin only
        if(req.user.role !== "admin"){
            return res.status(403).json({message: "Access denied as role is not Admin but ${req.user.role}"})
        }

        // To fetch all the values from enrollment table...it fetches only which are in enrollment table and not users
        const result = await pool.query(`
            SELECT 
                e.id,
                e.status,
                e.created_at,
                u.full_name,
                u.email,
                c.title AS course_title,
                c.level
            FROM enrollments e
            JOIN users u ON e.user_id = u.id
            JOIN courses c ON e.course_id = c.id
            ORDER BY e.created_at DESC
            `);

    res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error from Page adminEnrollments.js" });
    }
})

router.patch("/:id", authenticate, async(req, res) => {
    try {
        
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: `Access denied. Required role: admin. Your role: ${req.user.role}`
        });
}

        const {id} = req.params; //make sure to send enrollment Id and not userId
        const {action} = req.body;

        if (!["approved", "rejected"].includes(action)) {
            return res.status(400).json({
                message: `Invalid action. Action by admin should be either approved or rejected. Backend received: ${action}`
            });
        }

        await pool.query(
            `UPDATE enrollments
            SET status = $1
            WHERE id = $2`,
            [action, id]
            );

        res.json({message: "Enrollment updated successfully"})

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

export default router;
