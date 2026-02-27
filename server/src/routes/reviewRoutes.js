import express from "express"
import {pool} from "../db.js"
import authenticate from "../middleware/authenticate.js"
import authorizeRole from "../middleware/authorizeRole.js"

const router = express.Router();

/* =========================
   CREATE REVIEW
========================= */

router.post("/", authenticate, async (req, res) => {
  try {
    const { instagramHandle, reviewText } = req.body;

    if (!instagramHandle || !reviewText) {
      return res.status(400).json({
        message: "Instagram handle and review text required"
      });
    }

    const cleanedHandle = instagramHandle.replace("@", "").trim();

    const query = `
      INSERT INTO reviews (user_id, instagram_handle, review_text)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const values = [req.user.id, cleanedHandle, reviewText];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Review submitted. Awaiting approval.",
      review: result.rows[0]
    });

  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({
        message: "You already submitted a review. Please edit it instead."
      });
    }

    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   GET INDIVIDUAL REVIEW
========================= */

router.get("/my-review", authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM reviews WHERE user_id = $1",
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.json(null);
    }

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   EDIT REVIEW
========================= */

router.put("/", authenticate, async (req, res) => {
  try {
    const { instagramHandle, reviewText } = req.body;

    if (!instagramHandle || !reviewText) {
      return res.status(400).json({
        message: "Instagram handle and review text required"
      });
    }

    const cleanedHandle = instagramHandle.replace("@", "").trim();

    const query = `
      UPDATE reviews
      SET instagram_handle = $1,
          review_text = $2,
          status = 'pending',
          updated_at = now()
      WHERE user_id = $3
      RETURNING *
    `;

    const values = [cleanedHandle, reviewText, req.user.id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No review found to update"
      });
    }

    res.json({
      message: "Review updated. Awaiting admin approval.",
      review: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


/* =========================
   GET APPROVED REVIEWS FOR PUBLIC
========================= */

router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT 
        r.id,
        u.full_name,
        r.instagram_handle,
        r.review_text,
        r.created_at
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.status = 'approved'
      ORDER BY r.created_at DESC
    `;

    const result = await pool.query(query);

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   APPROVE REVIEW (ADMIN)
========================= */
// Here we will have to use  autheticate to check if user is loggedin, and authrorizeRole to check if user is an admin

router.patch(
  "/:id",
  authenticate,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({
          message: "Status must be 'approved' or 'rejected'"
        });
      }

      const result = await pool.query(
        `UPDATE reviews
         SET status = $1,
             updated_at = now()
         WHERE id = $2
         RETURNING *`,
        [status, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message: "Review not found"
        });
      }

      res.json({
        message: `Review ${status} successfully`,
        review: result.rows[0]
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);


export default router;