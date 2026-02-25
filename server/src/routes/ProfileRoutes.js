import express from "express";
import { pool } from "../db.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

/*
  SAVE OR UPDATE PROFILE
*/
router.post("/profile", authenticate, async (req, res) => {
  try {
    const user_id = req.user.id;

    const {
      phone,
      house_number,
      street,
      city,
      state,
      postcode,
      country,
      nationality,
      dob,
    } = req.body;

    const address = `${house_number} ${street}, ${city}, ${state}, ${postcode}`;

    const query = `
      INSERT INTO user_profiles
      (user_id, phone, address, country, nationality, dob)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (user_id)
      DO UPDATE SET
        phone = EXCLUDED.phone,
        address = EXCLUDED.address,
        country = EXCLUDED.country,
        nationality = EXCLUDED.nationality,
        dob = EXCLUDED.dob
      RETURNING *;
    `;

    const values = [
      user_id,
      phone,
      address,
      country,
      nationality,
      dob,
    ];
    console.log(">>> values of paramters for form in backend:", values)

    const result = await pool.query(query, values);

    res.status(200).json({
      success: true,
      profile: result.rows[0],
    });

  } catch (error) {
    console.error("Profile Save Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/*
  GET PROFILE + BASIC USER INFO
*/
router.get("/profile", authenticate, async (req, res) => {
  try {
    const user_id = req.user.id;

    const query = `
      SELECT 
        u.full_name,
        u.email,
        p.phone,
        p.address,
        p.country,
        p.nationality,
        p.dob
      FROM users u
      LEFT JOIN user_profiles p
      ON u.id = p.user_id
      WHERE u.id = $1;
    `;

    const result = await pool.query(query, [user_id]);

    res.status(200).json({
      success: true,
      profile: result.rows[0],
    });

  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;