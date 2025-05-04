import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kritikabhandari4002@gmail.com',
    pass: 'istv dpvs hqbv arne', // Use app password if 2FA is enabled
  },
});

export default transporter;

