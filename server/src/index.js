import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.json({ ok: true, app: "German Beyond Exams API" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
