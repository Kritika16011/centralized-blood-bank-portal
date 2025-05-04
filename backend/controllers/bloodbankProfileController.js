import pool from '../config/db.js';

// Fetch Blood Bank Profile by Email
export const getBloodBankProfile = async (req, res) => {
  const { email } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM bloodbank WHERE email = ?", [email]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Blood Bank Profile not found" });
    }
  } catch (error) {
    console.error("Error fetching blood bank profile:", error);
    res.status(500).json({ message: "Error fetching blood bank profile", error: error.message });
  }
};

// Update Blood Bank Profile
export const updateBloodBankProfile = async (req, res) => {
  const { email, blood_bank_name, parent_hospital_name, contact_person, contact_no, licence_no } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE bloodbank SET blood_bank_name= ?, parent_hospital_name = ?, contact_person = ?, contact_no = ?, licence_no = ? WHERE email = ?",
      [blood_bank_name, parent_hospital_name, contact_person, contact_no, licence_no, email]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Profile updated successfully" });
    } else {
      res.status(404).json({ message: "No record updated. Blood Bank Profile may not exist." });
    }
  } catch (error) {
    console.error("Error updating blood bank profile:", error);
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};
