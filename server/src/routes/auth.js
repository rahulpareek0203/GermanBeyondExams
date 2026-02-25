import express from "express";
import bcrypt from "bcrypt";
import { pool } from "../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

/* =========================
   REGISTER
========================= */

router.post("/register", async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        ok: false,
        message: "Full name, email and password are required"
      });
    }

    if (String(password).length < 6) {
      return res.status(400).json({
        ok: false,
        message: "Password must contain at least 6 characters"
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if email already exists
    const exists = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [cleanEmail]
    );

    if (exists.rows.length > 0) {
      return res.status(409).json({
        ok: false,
        message: "Email already registered"
      });
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const query = `
      INSERT INTO users (full_name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, full_name, email, role, created_at
    `;

    const values = [full_name.trim(), cleanEmail, passwordHash];
    const insert = await pool.query(query, values);

    const user = insert.rows[0];

    return res.status(201).json({
      ok: true,
      user
    });

  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      ok: false,
      message: "Registration failed"
    });
  }
});

/* =========================
   LOGIN
========================= */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: "Email and Password are required"
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const query = `
      SELECT id, full_name, email, password_hash, role
      FROM users
      WHERE email = $1
    `;

    const result = await pool.query(query, [cleanEmail]);

    if (result.rows.length === 0) {
      console.log(">>> message from backend auth.js", "Invalid email or password")
      return res.status(401).json({
        ok: false,
        message: "Email does not Exist !!!"
      });
    }

    const user = result.rows[0];
    console.log(">>>> Message from Backend (auth.js):", user.full_name, user.role)

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        ok: false,
        message: "Invalid email or password"
      });
    }

    // ✅ Token now includes role
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log(">>>> JWT Token from backend (auth,js):", token)

    return res.status(200).json({
      ok: true,
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      ok: false,
      message: "Login failed"
    });
  }
});

export default router;
