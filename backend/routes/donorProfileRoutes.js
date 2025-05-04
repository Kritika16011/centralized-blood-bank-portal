import express from 'express';
import { fetchDonorProfile, updateDonorProfile } from '../controllers/donorProfileController.js';

const router = express.Router();

// Fix: Ensure email is correctly extracted and handled
router.get('/donorprofile/:email', (req, res, next) => {
    const email = req.params.email;
    
    if (!email) {
        return res.status(400).json({ message: "Email is required in URL" });
    }

    req.email = decodeURIComponent(email); // Decode in case it's URL-encoded
    next();
}, fetchDonorProfile);

router.post('/update-donorprofile', updateDonorProfile);

export default router;

