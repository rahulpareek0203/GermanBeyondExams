import express from "express";
import authenticate from "../middleware/authenticate.js";
import authorizeRole from "../middleware/authorizeRole.js";

const router = express.Router();

router.get(
  "/admin/dashboard",
  authenticate,
  authorizeRole("admin"),
  (req, res) => {
    res.json({
      ok: true,
      message: "You are authorized as Admin",
      user: req.user
    });
  }
);

export default router;
