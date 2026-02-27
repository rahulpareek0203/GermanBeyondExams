import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import { pool } from "./db.js";


dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Health check route for UptimeRobot
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

import authRouter from "./routes/auth.js";
app.use("/api", authRouter)   //it basically creates a route called "auth" where register and login can be added

import adminRoutes from "./routes/adminRoutes.js";
app.use("/api", adminRoutes)

// this one is for creating or checking the status of request from student side
import enrollmentRoutes from "./routes/enrollmentRoutes.js"
app.use("/api/enrollments", enrollmentRoutes)

// this one is for managing and seeing all requests from admin side which should not be accessible by student
import adminEnrollments from "./routes/adminRoutes/adminEnrollments.js"
app.use("/api/admin/enrollments", adminEnrollments)

// This one is for both admin and students to access profile info common route
import profileRoutes from "./routes/ProfileRoutes.js"
app.use("/api", profileRoutes);

import reviewRoutes from "./routes/reviewRoutes.js"
app.use("/api/reviews", reviewRoutes);


















app.get("/health", (req, res) => {
  res.json({ ok: true, app: "German Beyond Exams API" });
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() as now");
    res.json({ ok: true, now: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "DB connection failed" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
