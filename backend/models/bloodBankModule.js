

    // Insert into bloodbankaddress table
   /* const addressQuery = "INSERT INTO bloodbankaddress (State, District, City, Postal_Address) VALUES (?, ?, ?, ?)";
    db.query(addressQuery, [State, District, City, Postal_Address], (err, addressResult) => {
        if (err) {
            return res.status(500).json({ error: "Failed to insert address data" });
        }

        const addressId = addressResult.insertId; // Get the inserted address ID

        // Insert into bloodbank
        const bloodBankQuery = `
            INSERT INTO bloodbank
            (BloodBankName, ParentHospitalName, Category, ContactPerson, Email, Contact_Number, 
            First_Registration_Date, LicenceNumber, ComponentFacility, ApheresisFacility, HelplineNumber) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(bloodBankQuery, [
            BloodBankName, ParentHospitalName, Category, ContactPerson, Email, ContactNo,
            first_registration_date, licence_no, component_facility, apheresis_facility, helpline_no, addressId
        ], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Failed to insert blood bank data" });
            }
            res.status(200).json({ message: "Blood bank data inserted successfully" });
        });
    });*/




















































































































