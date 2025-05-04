// test-email.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kritikabhandari4002@gmail.com',
    pass: 'istv dpvs hqbv arne',
  },
});

const mailOptions = {
  from: 'kritikabhandari4002@gmail.com',
  to: 'deekshat4399@gmail.com',
  subject: 'Test Email',
  text: 'This is a test email from Nodemailer!',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('❌ Error:', error);
  }
  console.log('✅ Test email sent:', info.response);
});
