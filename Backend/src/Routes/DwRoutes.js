import express from 'express';
import { Quotation } from '../models/Contact.js'; 
import SendMail from '../helpers/sendMail.js';
const router = express.Router();



router.post('/contact', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, message } = req.body;

  try {
    const newQuote = await Quotation.create(req.body);

    const subject = 'Quotation Received - Thank You for Reaching Out';

    const text = `Hi ${firstName}, thanks for reaching out to DigitalWaves. We've received your request and will contact you soon.`;

    const html = `
<p>Hi <strong>${firstName}</strong>,</p>
<p>Thanks for contacting DigitalWaves. We've received your request and will get back to you shortly.</p>
`;

    await SendMail(email, subject, text, html);

    return res.json({ msg: 'success', newQuote });
  } catch (error) {
    console.error('QUOTATION SAVE ERROR:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;