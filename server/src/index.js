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


import authRouter from "./routes/auth.js";
app.use("/auth", authRouter)   //it basically creates a route called auth where register and login can be added


















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
