import express from "express";
import { fetchBloodBankDirectories } from "../controllers/bloodbankdirectoryController.js";

const router = express.Router();

router.get("/bloodbankdirectory", fetchBloodBankDirectories);

export default router;