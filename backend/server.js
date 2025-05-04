
import express from 'express';
import cors from 'cors';
import bloodBankRoutes from './routes/bloodBankRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import donorRoutes from './routes/donorRoutes.js';
import bloodbankdirectoryRoutes from "./routes/bloodbankdirectoryRoutes.js";
import donorAuthRoutes from "./routes/donorAuthRoutes.js";
import donorProfileRoutes from './routes/donorProfileRoutes.js';
import bloodbankProfileRoutes from "./routes/bloodbankProfileRoutes.js";
import bloodComponentRoutes from "./routes/bloodComponentRoutes.js";
import availabilityRoutes from './routes/availabilityRoutes.js';
import donorDetailsRoutes from './routes/donorDetailsRoutes.js';
import requestRoutes from './routes/requestRoutes.js';











import session from "express-session";  // ✅ Import session middleware
import pool from './config/db.js'; // The pool import

const app = express();


// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON bodies
app.use(session({ secret: "supersecret", resave: false, saveUninitialized: true }));




// Routes
app.use('/bloodbank', bloodBankRoutes);
app.use('/api/availability', availabilityRoutes);
app.use("/api", authRoutes);
app.use("/api", bloodbankdirectoryRoutes);
app.use("/api/donorAuth", donorAuthRoutes);
app.use('/', donorProfileRoutes);
app.use("/bloodbankprofile", bloodbankProfileRoutes);
app.use("/api/components", bloodComponentRoutes); // This should match
app.use('/donor-details', donorDetailsRoutes); 
app.use('/api', requestRoutes);








//app.use('/api/donors', donorRoutes);
app.use('/donors', donorRoutes); 




// Optional: Test the pool connection on server startup
(async () => {
  try {
    // Make a quick test query to ensure the pool is connected
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('MySQL Pool Connected Successfully. Test result:', rows[0].result);
    
    // Start the server only after a successful test
    const PORT = process.env.PORT || 5000;
    const HOST = process.env.HOST || '172.20.133.238'; // Set Static IP Address


   
    
    app.listen(PORT,() => {
      console.log(`Server running on port ${PORT}`);
    });
    
  } catch (error) {
    console.error('Failed to connect to DB:', error);
    process.exit(1); // Exit process with failure
  }})();
