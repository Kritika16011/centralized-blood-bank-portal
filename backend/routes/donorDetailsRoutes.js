import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { state, district, bloodGroup } = req.query;

  let sql = `SELECT id, name, age, gender, email FROM donors WHERE 1=1`;
  const params = [];

  if (state) {
    sql += ' AND state = ?';
    params.push(state);
  }
  if (district) {
    sql += ' AND district = ?';
    params.push(district);
  }
  if (bloodGroup && bloodGroup !== 'All Blood Groups') {
    sql += ' AND blood_type = ?'; // ✅ Changed this line
    params.push(bloodGroup);
  }

  try {
    const [results] = await db.query(sql, params);
    res.json(results);
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
