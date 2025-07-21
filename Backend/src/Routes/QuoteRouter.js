

import express from 'express';
import sanitizeHtml from 'sanitize-html';
import { Quotation } from '../models/Contact.js'; 
import SendMail from '../helpers/sendMail.js';

const router = express.Router();

//POST /api/contact — Save quote and send email
router.post('/contact', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, message } = req.body;

  try {
    const safeMessage = sanitizeHtml(message || '', {
      allowedTags: [],
      allowedAttributes: {},
    });

    const newQuote = await Quotation.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      message: safeMessage,
    });

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

//  GET /api/quote — Get all stored user quotes (for admin)
router.get('/quote', async (_req, res) => {
  try {
    const allQuotes = await Quotation.find({}).sort({ createdAt: -1 });
    res.json(allQuotes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});

export default router;
