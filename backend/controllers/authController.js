import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const SECRET_KEY = "mysecretkey"; // Change this in production

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rawatdiksha7817@gmail.com",
    pass: "ufys xmwq ldbc xkwt",
  },
});

// ✅ Register User (Only if email exists in bloodbank table)
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || password.length < 6) {
      return res.status(400).json({ message: "Valid email and password are required (Min: 6 chars)" });
    }

    // Check if email exists in bloodbank table
    const [donor] = await pool.query("SELECT * FROM bloodbank WHERE email = ?", [email]);
    if (donor.length === 0) {
      return res.status(400).json({ message: "Email not registered as a bloodbank" });
    }

    const bloodbank_id = donor[0].id;

    // Check if user already exists
    const [existingUser] = await pool.query("SELECT * FROM bloodbank_accounts WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into bloodbank_accounts with foreign key
    await pool.query(
      "INSERT INTO bloodbank_accounts (email, password, bloodbank_id) VALUES (?, ?, ?)",
      [email, hashedPassword, bloodbank_id]
    );

    res.status(201).json({ message: "Registration successful!" });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// ✅ Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await pool.query("SELECT * FROM bloodbank_accounts WHERE email = ?", [email]);
    if (user.length === 0) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user[0].id, email: user[0].email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful!", token });

  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// ✅ Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const [user] = await pool.query("SELECT * FROM bloodbank_accounts WHERE email = ?", [email]);
    if (!user.length) return res.status(400).json({ message: "User not found" });

    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();

    await pool.query("UPDATE bloodbank_accounts SET reset_token = ? WHERE email = ?", [resetToken, email]);

    const mailOptions = {
      from: "rawatdiksha7817@gmail.com",
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
    let { newPassword } = req.body;
    let token = parseInt(req.params.token, 10);

    if (isNaN(token)) return res.status(400).json({ message: "Invalid token format" });

    const [user] = await pool.query("SELECT * FROM bloodbank_accounts WHERE reset_token = ?", [token]);
    if (!user.length) return res.status(400).json({ message: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [result] = await pool.query(
      "UPDATE bloodbank_accounts SET password = ?, reset_token = NULL WHERE reset_token = ?",
      [hashedPassword, token]
    );

    if (result.affectedRows === 0) return res.status(400).json({ message: "Invalid or expired token" });

    res.status(200).json({ message: "Password reset successful" });

  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
};
