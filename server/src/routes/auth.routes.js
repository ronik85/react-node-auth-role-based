import express from "express";
import { registerUser, loginAdmin, verifyEmail } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/admin-login", loginAdmin);
router.post("/verify-email", verifyEmail);

export default router;
