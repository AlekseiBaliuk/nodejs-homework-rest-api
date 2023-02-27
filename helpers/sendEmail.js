const nodemailer = require("nodemailer");

async function sendEmail(verifyEmail) {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SEND_EMAIL_USER,
      pass: process.env.SEND_EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail(verifyEmail);

  console.log("Message sent: %s", info.messageId);

  return true;
}

module.exports = sendEmail;

// ===================================================================================== //

// const sgMail = require("@sendgrid/mail");
// require("dotenv").config();

// const { SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// const sendEmail = async (data) => {
//   const email = { ...data, from: "oleksiy.baliuk@gmail.com" };
//   await sgMail.send(email);
//   return true;
// };

// module.exports = sendEmail;
