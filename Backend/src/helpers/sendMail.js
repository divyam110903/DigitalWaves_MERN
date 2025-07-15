import dotenv from "dotenv";
import nodemailer from 'nodemailer';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port:465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER ,
    pass: process.env.SMTP_PASS 
  },
});

await transporter.verify();

const SendMail = async (to, subject, text, html) => {
  await transporter.sendMail({
    from: '<noreply@gmail.com>',
    to,
    subject,
    text,
    html,
  });
};

export default SendMail;