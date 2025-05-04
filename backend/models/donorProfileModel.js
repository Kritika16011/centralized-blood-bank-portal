import pool from '../config/db.js';

// Get donor details by email (MySQL uses ? as a placeholder)
export const getDonorProfileByEmail = async (email) => {
  try {
      if (!email) {
          throw new Error("Email is required"); // Handle missing email
      }

      const query = `
          SELECT name, age, blood_type, mobile, email, address
          FROM donors
          WHERE email = ?
          LIMIT 1
      `;
      const [rows] = await pool.query(query, [email]);

      if (rows.length === 0) {
          return null; // No donor found
      }

      return rows[0]; // Return donor details

  } catch (error) {
      console.error("Database Error in getDonorProfileByEmail:", error);
      throw new Error("Database query failed");
  }
};


//update
export const upsertDonorProfile = async (donorData) => {
  const { email, ...fieldsToUpdate } = donorData;

  if (!email) {
    throw new Error("Email is required to update the donor profile");
  }

  const fieldNames = Object.keys(fieldsToUpdate);
  const values = Object.values(fieldsToUpdate);

  if (fieldNames.length === 0) {
    throw new Error("No fields to update");
  }

  const query = `
    UPDATE donors 
    SET ${fieldNames.map((field) => `${field} = ?`).join(", ")}
    WHERE email = ?;
  `;

  console.log("📜 Executing Query:", query, [...values, email]); // Log query

  try {
    const [rows] = await pool.query(query, [...values, email]);
    console.log("✅ Query Result:", rows);
    return rows;
  } catch (dbError) {
    console.error("❌ Database Query Error:", dbError);
    throw dbError;
  }
};


