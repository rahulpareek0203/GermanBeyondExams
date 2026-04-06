import express from "express";
import { pool } from "../../db.js";
import authenticate from "../../middleware/authenticate.js";
import authorizeRole from "../../middleware/authorizeRole.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeRole("admin"),
  async (req, res) => {
    const {
      user_id,
      course_id,
      exam_id,

      lesen,
      lesen_max,
      hoeren,
      hoeren_max,
      schreiben,
      schreiben_max,
      sprechen,
      sprechen_max,
    } = req.body;

    try {
      /* ===============================
         1. FETCH EXISTING DATA
      =============================== */
      const existing = await pool.query(
        `
        SELECT *
        FROM exam_results
        WHERE user_id = $1 AND course_id = $2 AND exam_name = $3
        `,
        [user_id, course_id, exam_id]
      );

      const old = existing.rows[0] || {};

      /* ===============================
         2. MERGE OLD + NEW VALUES
      =============================== */
      const final = {
        lesen: lesen ?? old.lesen ?? 0,
        lesen_max: lesen_max ?? old.lesen_max ?? 0,

        hoeren: hoeren ?? old.hoeren ?? 0,
        hoeren_max: hoeren_max ?? old.hoeren_max ?? 0,

        schreiben: schreiben ?? old.schreiben ?? 0,
        schreiben_max: schreiben_max ?? old.schreiben_max ?? 0,

        sprechen: sprechen ?? old.sprechen ?? 0,
        sprechen_max: sprechen_max ?? old.sprechen_max ?? 0,
      };

      /* ===============================
         3. CALCULATE TOTALS
      =============================== */
      const total_score =
        final.lesen +
        final.hoeren +
        final.schreiben +
        final.sprechen;

      const total_max =
        final.lesen_max +
        final.hoeren_max +
        final.schreiben_max +
        final.sprechen_max;

      const percentage = total_max
        ? ((total_score / total_max) * 100).toFixed(1)
        : 0;

      /* ===============================
         4. INSERT / UPDATE
      =============================== */
      await pool.query(
        `
        INSERT INTO exam_results (
          user_id, course_id, exam_name,
          lesen, lesen_max,
          hoeren, hoeren_max,
          schreiben, schreiben_max,
          sprechen, sprechen_max,
          total_score, total_max, percentage
        )
        VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14
        )
        ON CONFLICT (user_id, course_id, exam_name)
        DO UPDATE SET
          lesen = EXCLUDED.lesen,
          lesen_max = EXCLUDED.lesen_max,
          hoeren = EXCLUDED.hoeren,
          hoeren_max = EXCLUDED.hoeren_max,
          schreiben = EXCLUDED.schreiben,
          schreiben_max = EXCLUDED.schreiben_max,
          sprechen = EXCLUDED.sprechen,
          sprechen_max = EXCLUDED.sprechen_max,
          total_score = EXCLUDED.total_score,
          total_max = EXCLUDED.total_max,
          percentage = EXCLUDED.percentage
        `,
        [
          user_id,
          course_id,
          exam_id,

          lesen,
          lesen_max,
          hoeren,
          hoeren_max,
          schreiben,
          schreiben_max,
          sprechen,
          sprechen_max,

          total_score,
          total_max,
          percentage,
        ]
      );

      res.json({ message: "Result saved successfully" });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to save result" });
    }
  }
);

export default router;