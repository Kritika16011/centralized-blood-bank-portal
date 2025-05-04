/*import pool from '../config/db.js';

export const createDonor = async (donorData) => {
    const { name, age, gender, fatherName, mobile, email, state, district, address, pinCode } = donorData;
    
    const query = `
        INSERT INTO donors (name, age, gender, father_name, mobile, email, state, district, address, pin_code)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [name, age, gender, fatherName, mobile, email, state, district, address, pinCode];

    try {
        // Insert donor into database
        const [result] = await pool.query(query, values);
        
        // Fetch the newly inserted donor using the inserted ID
        const [newDonor] = await pool.query("SELECT * FROM donors WHERE id = ?", [result.insertId]);

        return newDonor[0]; // Return the newly created donor record
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    }
};*/
