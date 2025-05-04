import express from 'express';
import { handleBloodRequest } from '../controllers/requestController.js';

const router = express.Router();

router.post('/request-blood', handleBloodRequest);

export default router;

