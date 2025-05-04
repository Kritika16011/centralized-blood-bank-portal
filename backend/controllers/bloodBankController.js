
/*import db from "../config/db.js";

// Insert data into two tables
export const addBloodBank = (req, res) => {
    const {
        state, district, city, postal_address, 
        blood_bank_name, parent_hospital_name, category, 
        contact_person, email, contact_no, first_registration_date, 
        licence_no, component_facility, apheresis_facility, helpline_no
    } = req.body;

    const addressQuery = `INSERT INTO bloodbankaddress (state, district, city, postal_address) VALUES (?, ?, ?, ?)`;

    db.query(addressQuery, [state, district, city, postal_address], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error inserting into bloodbankaddress" });
        }
        
        const address_id = result.insertId; // Get the last inserted ID

        const bankQuery = `INSERT INTO bloodbank (blood_bank_name, parent_hospital_name, category, contact_person, email, contact_no, first_registration_date, licence_no, component_facility, apheresis_facility, helpline_no, address_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(bankQuery, [blood_bank_name, parent_hospital_name, category, contact_person, email, contact_no, first_registration_date, licence_no, component_facility, apheresis_facility, helpline_no, address_id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error inserting into bloodbank" });
            }
            res.status(200).json({ message: "Blood bank added successfully" });
        });
    });
};*/
import pool from '../config/db.js';

export const addBloodBank = async (req, res) => {
  try {
    // 1. Destructure the fields from request body
    const {
      state,
      district,
      city,
      postal_address,
      blood_bank_name,
      parent_hospital_name,
      category, 
      contact_person,
      email,
      contact_no,
      first_registration_date,
      licence_no,
      component_facility,
      apheresis_facility,
      helpline_no,
    } = req.body;

    // 2. Define your SQL queries
    const addressQuery = `
      INSERT INTO bloodbankaddress(state, district, city, postal_address)
      VALUES (?, ?, ?, ?)
    `;
    const bankQuery = `
      INSERT INTO bloodbank(blood_bank_name, parent_hospital_name, category, contact_person,
       email, contact_no, first_registration_date, licence_no, component_facility,
       apheresis_facility, helpline_no, address_id )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // 3. Execute the first query (addresses)
    const [addressResult] = await pool.query(addressQuery, [
      state,
      district,
      city,
      postal_address,
    ]);
   
    if (addressResult.affectedRows === 1) {
      console.log('Address inserted successfully.');
    } else {
      return res.status(400).json({ message: 'Error inserting into bloodbankaddresses' });
    }
     // 4. Get the inserted address ID
     const addressId = addressResult.insertId; // <-- This is the key!
    // 5. Execute the second query (blood bank info)
    const [bankResult] = await pool.query(bankQuery, [
      blood_bank_name,
      parent_hospital_name,
      category,
      contact_person,
      email,
      contact_no,
      first_registration_date,
      licence_no,
      component_facility,
      apheresis_facility,
      helpline_no,
      addressId           // <-- Pass the addressId from the first insert
    ]);

    if (bankResult.affectedRows === 1) {
      console.log('Blood bank info inserted successfully.');
      return res.status(201).json({ message: 'Blood bank added successfully!' });
    } else {
      return res.status(400).json({ message: 'Error inserting into bloodbank table' });
    }

  } catch (error) {
    console.error('Error inserting data:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

