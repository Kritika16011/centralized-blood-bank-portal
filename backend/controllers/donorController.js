
import pool from '../config/db.js';

export const registerDonor = async (req, res) => {
  try {
    // 1. Destructure the request body
    const {
      name,
      age,
      gender,
      father_name,
      mobile,
      email,
      state,
      district,
      address,
      pin_code,
      blood_type
    } = req.body;

    // 2. Validate required fields (including email)
    if (!name || !age || !gender || !mobile || !email || !state || !district || !address || !pin_code|| !blood_type) {
      return res.status(400).json({ success: false, message: "All fields are required, including email" });
    }

    // 3. Convert age to an integer
    const ageNumber = parseInt(age, 10);

    // 4. Check for an existing donor with the same mobile or email
    const [existing] = await pool.query(
      "SELECT * FROM donors WHERE mobile = ? OR email = ?", 
      [mobile, email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: "Mobile or email already registered" });
    }

    // 5. SQL query to insert a new donor
    const donorQuery = `
      INSERT INTO donors (name, age, gender, father_name, mobile, email, state, district, address, pin_code, blood_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const donorValues = [
      name,
      ageNumber,
      gender,
      father_name,
      mobile,
      email,
      state,
      district,
      address,
      pin_code,
      blood_type
    ];

    // 6. Execute the query to insert donor details
    const [donorResult] = await pool.query(donorQuery, donorValues);

    if (donorResult.affectedRows === 1) {
      console.log('✅ Donor registered successfully.');

      // 7. Fetch the newly inserted donor
      const [newDonor] = await pool.query("SELECT * FROM donors WHERE id = ?", [donorResult.insertId]);

      return res.status(201).json({
        success: true,
        message: "Donor registered successfully",
        donor: newDonor[0]
      });
    } else {
      return res.status(400).json({ success: false, message: "Error registering donor" });
    }

  } catch (error) {
    console.error("❌ Database error:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

