import pool from "../config/db.js";

export const getBloodBankDirectories = async (state, district, searchName) => {
  try {
    let query = `
      SELECT 
        b.id, b.blood_bank_name, b.parent_hospital_name, b.category, b.email, 
        b.contact_person, b.contact_no, b.first_registration_date, b.licence_no, 
        b.component_facility, b.apheresis_facility, b.helpline_no, 
        a.state, a.district, a.city, a.postal_address 
      FROM bloodbank b
      JOIN bloodbankaddress a ON b.address_id = a.id
      WHERE a.state = ? AND a.district = ?
    `;

    let params = [state, district];

    if (searchName) {
      query += ` AND (b.blood_bank_name LIKE ? OR b.parent_hospital_name LIKE ?)`;
      params.push(`%${searchName}%`, `%${searchName}%`);
    }

    const [rows] = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.error("Database Query Error:", error);
    throw error;
  }
};



