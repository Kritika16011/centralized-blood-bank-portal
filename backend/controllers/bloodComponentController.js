import pool from '../config/db.js';

// Add or Update Blood Component Availability
export const manageBloodComponents = async (req, res) => {
  const { email, blood_type, plasma_units, platelets_units, wbc_units, rbc_units } = req.body;

  try {
    if (!email || !blood_type) {
      return res.status(400).json({ message: "Missing required fields: email or blood_type" });
    }

    const [existing] = await pool.query(
      "SELECT * FROM blood_components WHERE blood_bank_email = ? AND blood_type = ?",
      [email, blood_type]
    );

    if (existing.length > 0) {
      // Update existing
      const [updateResult] = await pool.query(
        "UPDATE blood_components SET plasma_units = ?, platelets_units = ?, wbc_units = ?, rbc_units = ? WHERE blood_bank_email = ? AND blood_type = ?",
        [plasma_units, platelets_units, wbc_units, rbc_units, email, blood_type]
      );
      return res.json({ message: "Blood components updated successfully" });
    } else {
      // Insert new
      await pool.query(
        "INSERT INTO blood_components (blood_bank_email, blood_type, plasma_units, platelets_units, wbc_units, rbc_units) VALUES (?, ?, ?, ?, ?, ?)",
        [email, blood_type, plasma_units, platelets_units, wbc_units, rbc_units]
      );
      return res.json({ message: "Blood components added successfully" });
    }

  } catch (error) {
    console.error("❌ Error managing blood components:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
