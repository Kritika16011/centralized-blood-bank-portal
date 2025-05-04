import db from '../config/db.js';

export const checkAvailability = async (req, res) => {
  try {
    const { state, district, blood_type, component } = req.body;

    if (!state || !district || !blood_type || !component) {
      return res.status(400).json({ message: 'State, district, blood type, and component are required' });
    }

    // Mapping valid components to table columns
    const componentColumnMap = {
      plasma: 'plasma_units',
      platelets: 'platelets_units',
      wbc: 'wbc_units',
      rbc: 'rbc_units',
    };

    const columnName = componentColumnMap[component.toLowerCase()];
    if (!columnName) {
      return res.status(400).json({ message: 'Invalid component specified' });
    }

    const query = `
      SELECT b.email, bcs.blood_type, bcs.${columnName} AS available_units
      FROM bloodbank b
      JOIN bloodbankaddress bba ON bba.id = b.id  -- Changed here to use 'id' instead of 'blood_bank_id'
      JOIN blood_components bcs ON bcs.blood_bank_email = b.email
      WHERE bba.state = ? AND bba.district = ? AND bcs.blood_type = ?`;

    const [rows] = await db.execute(query, [state, district, blood_type]);

    if (rows.length > 0) {
      res.json({
        blood_type,
        component,
        availableUnits: rows[0].available_units,
        bloodBankEmail: rows[0].email
      });
    } else {
      res.json({
        blood_type,
        component,
        availableUnits: 0,
        message: 'No stock found for this combination in the specified location'
      });
    }
  } catch (err) {
    console.error('Error checking availability:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
