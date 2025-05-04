
import express from "express";
import { manageBloodComponents } from "../controllers/bloodComponentController.js";

const router = express.Router();

router.post("/update", manageBloodComponents); // Make sure this matches your API call

export default router;
