import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kritikabhandari4002@gmail.com",
        pass: "istv dpvs hqbv arne" // Use App Passwords for security
      }
    });

    await transporter.sendMail({
      from: "kritikabhandari4002@gmail.com",
      to,
      subject,
      text
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
