import express from 'express';
import { registerDonor } from '../controllers/donorController.js';
//import { verifyCaptcha } from '../middleware/captchaMiddleware.js';

const router = express.Router();

// router.post('/signup', verifyCaptcha, registerDonor); // Remove verifyCaptcha
router.post('/signup', registerDonor); // Updated Route




export default router;
