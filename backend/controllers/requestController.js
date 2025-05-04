import pool from '../config/db.js';
import transporter from '../utils/mail.js';

export const handleBloodRequest = async (req, res) => {
  const {
    donor_email,
    donor_name,
    blood_type,
    blood_component,
    user_name,
    user_contact,
    user_email,
    user_location,
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO blood_requests 
        (donor_email, donor_name, blood_type, blood_component, user_name, user_contact, user_email, user_location) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [donor_email, donor_name, blood_type, blood_component, user_name, user_contact, user_email, user_location]
    );

    const mailOptions = {
      from: 'your_email@gmail.com',
      to: donor_email,
      subject: '🩸 Blood Request Notification',
      html: `
        <h3>Hello ${donor_name},</h3>
        <p>A new blood request has been made:</p>
        <ul>
          <li><strong>Blood Type:</strong> ${blood_type}</li>
          <li><strong>Component:</strong> ${blood_component}</li>
        </ul>
        <p><strong>Requester Details:</strong></p>
        <ul>
          <li>Name: ${user_name}</li>
          <li>Contact: ${user_contact}</li>
          <li>Email: ${user_email}</li>
          <li>Location: ${user_location}</li>
        </ul>
        <p>Please contact them directly if you are available to donate.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Request submitted and email sent.' });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};


