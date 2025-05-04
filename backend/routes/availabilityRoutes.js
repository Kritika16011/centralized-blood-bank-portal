import express from 'express';
import { checkAvailability } from '../controllers/availabilityController.js';

const router = express.Router();

router.post('/check', checkAvailability);

export default router;
