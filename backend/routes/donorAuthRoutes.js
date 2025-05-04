import express from "express";
import { register, donorLogin, forgotPassword, resetPassword } from "../controllers/donorAuthController.js";

const router = express.Router();

// ✅ Register Donor
router.post("/register", register);

// ✅ Login Donor
router.post("/login", donorLogin);

// ✅ Forgot Password (Returns Token)
router.post("/forgot-password", forgotPassword);

// ✅ Reset Password
router.post("/reset-password/:token", resetPassword);

export default router;
