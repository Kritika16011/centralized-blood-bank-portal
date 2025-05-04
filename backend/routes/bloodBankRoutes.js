import express from 'express';
import { addBloodBank } from '../controllers/bloodBankController.js';

const router = express.Router();

// POST request to add a new blood bank
router.post('/add', addBloodBank);

export default router;
