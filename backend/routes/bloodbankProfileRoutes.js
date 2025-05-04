import express from "express";
import { getBloodBankProfile, updateBloodBankProfile } from "../controllers/bloodbankProfileController.js";

const router = express.Router();

router.get("/:email", getBloodBankProfile);
router.put("/update", updateBloodBankProfile);  // ✅ Ensure "/update" is present



export default router;
