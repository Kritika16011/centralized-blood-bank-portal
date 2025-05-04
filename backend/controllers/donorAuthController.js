
import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";  // ✅ Correct
import crypto from "crypto";  // ✅ No need to install

import nodemailer from "nodemailer";

const SECRET_KEY = "mysecretkey"; // Change this in production

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rawatdiksha7817@gmail.com", // Replace with your email
    pass: "ufys xmwq ldbc xkwt", // Replace with your email password
  },
});

// ✅ Register Donor (Only if email exists in `donors` table)
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email exists in `donors` table first
    const [donor] = await pool.query("SELECT * FROM donors WHERE email = ?", [email]);
    if (!donor.length) return res.status(400).json({ message: "Email not registered as a donor" });

    // Check if donor already exists in donorlogin
    const [existingDonor] = await pool.query("SELECT * FROM donorlogin WHERE email = ?", [email]);
    if (existingDonor.length) return res.status(400).json({ message: "Donor already registered" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert donor details into donorlogin
    await pool.query("INSERT INTO donorlogin (email, password) VALUES (?, ?)", [email, hashedPassword]);

    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering donor", error });
  }
};

// ✅ Login Donor
export const donorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check donor login details
    const [donorLogin] = await pool.query("SELECT * FROM donorlogin WHERE email = ?", [email]);
    if (!donorLogin.length) return res.status(400).json({ message: "Donor login details not found" });

    const donor = donorLogin[0]; // ✅ Safe Access
    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ donorId: donor.id, email: donor.email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};


// ✅ Forgot Password - Generate Numeric Reset Token and Send Email
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if donor exists in donorlogin
    const [user] = await pool.query("SELECT * FROM donorlogin WHERE email = ?", [email]);
    if (!user.length) return res.status(400).json({ message: "User not found" });

    // Generate a 6-digit numeric reset token
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();

    // Store reset token in database
    await pool.query("UPDATE donorlogin SET reset_token = ? WHERE email = ?", [resetToken, email]);

    // Send email with reset token
    const mailOptions = {
      from: "your-email@gmail.com", // Replace with your email
      to: email,
      subject: "Password Reset Token",
      text: `Your password reset token is: ${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset token sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Error generating reset token", error });
  }
};

// ✅ Reset Password
export const resetPassword = async (req, res) => {
  try {
    let { newPassword } = req.body;  // Extract only newPassword from request body
    let token = req.params.token;    // Extract token from URL params

    // Convert token to an integer (Ensure it's a number)
    token = parseInt(token, 10);
    if (isNaN(token)) return res.status(400).json({ message: "Invalid token format" });

    console.log("Received Token (as number):", token);

    // Verify reset token in database
    const [user] = await pool.query("SELECT * FROM donorlogin WHERE reset_token = ?", [token]);
    if (!user.length) return res.status(400).json({ message: "Invalid or expired token" });

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and remove reset token
    const [result] = await pool.query(
      "UPDATE donorlogin SET password = ?, reset_token = NULL WHERE reset_token = ?",
      [hashedPassword, token]
    );

    if (result.affectedRows === 0) return res.status(400).json({ message: "Invalid or expired token" });

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
};
