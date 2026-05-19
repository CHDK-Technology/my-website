require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const Contact = require('./models/Contact');
const Apply = require('./models/Apply');

const app = express();

/* ---------------- SECURITY ---------------- */

app.use(helmet());

app.use(express.json({
  limit: '10kb'
}));

/* ---------------- CORS ---------------- */

const allowedOrigins = [
  'http://localhost:3000',
  'https://yourdomain.com',
  'https://www.yourdomain.com'
];

app.use(cors({
  origin: function (origin, callback) {

    // Allow requests with no origin
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

/* ---------------- RATE LIMITER ---------------- */

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    message: 'Too many requests. Please try again later.'
  }
});

/* ---------------- NODEMAILER ---------------- */

const transporter = nodemailer.createTransport({
  service: 'gmail',

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* ---------------- MONGODB ---------------- */

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

/* ---------------- ROOT ---------------- */

app.get('/', (req, res) => {
  res.send('CHDK API is running...');
});

/* =========================================================
   CONTACT API
========================================================= */

app.post('/api/contact', contactLimiter, async (req, res) => {

  try {

    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      enquiryType,
      message
    } = req.body;

    /* ---------- Validation ---------- */

    if (
      !firstName ||
      !lastName ||
      !email ||
      !enquiryType ||
      !message
    ) {
      return res.status(400).json({
        message: 'Please fill all required fields.'
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Invalid email address.'
      });
    }

    /* ---------- Save to MongoDB ---------- */

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      company,
      enquiryType,
      message
    });

    await newContact.save();

    /* ---------- Notify Team ---------- */

    await transporter.sendMail({

      from: `"CHDK Website" <${process.env.EMAIL_USER}>`,

      to: process.env.NOTIFY_EMAIL,

      subject: `New Contact Form: ${enquiryType}`,

      html: `
        <h2 style="color:#1a1a2e">
          New Contact Form Submission
        </h2>

        <table style="border-collapse:collapse;width:100%">

          <tr>
            <td style="padding:8px;border:1px solid #ddd">
              <strong>Name</strong>
            </td>

            <td style="padding:8px;border:1px solid #ddd">
              ${firstName} ${lastName}
            </td>
          </tr>

          <tr>
            <td style="padding:8px;border:1px solid #ddd">
              <strong>Email</strong>
            </td>

            <td style="padding:8px;border:1px solid #ddd">
              ${email}
            </td>
          </tr>

          <tr>
            <td style="padding:8px;border:1px solid #ddd">
              <strong>Phone</strong>
            </td>

            <td style="padding:8px;border:1px solid #ddd">
              ${phone || 'Not provided'}
            </td>
          </tr>

          <tr>
            <td style="padding:8px;border:1px solid #ddd">
              <strong>Company</strong>
            </td>

            <td style="padding:8px;border:1px solid #ddd">
              ${company || 'Not provided'}
            </td>
          </tr>

          <tr>
            <td style="padding:8px;border:1px solid #ddd">
              <strong>Enquiry Type</strong>
            </td>

            <td style="padding:8px;border:1px solid #ddd">
              ${enquiryType}
            </td>
          </tr>

        </table>

        <p style="margin-top:16px">
          <strong>Message:</strong>
        </p>

        <p style="
          background:#f5f5f5;
          padding:12px;
          border-radius:4px;
        ">
          ${message}
        </p>
      `
    });

    /* ---------- Auto Reply ---------- */

    await transporter.sendMail({

      from: `"CHDK Technology Center" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: 'Thank you for contacting CHDK Technology Center',

      html: `
        <p>Dear ${firstName},</p>

        <p>
          Thank you for reaching out to
          <strong>CHDK Technology Center</strong>.
        </p>

        <p>
          We have received your message and will
          respond within 24 hours.
        </p>

        <p>
          For urgent enquiries contact:
          <a href="mailto:info@chdkindia.com">
            info@chdkindia.com
          </a>
        </p>

        <br>

        <p>
          Best regards,<br>
          <strong>CHDK Technology Center Team</strong>
        </p>
      `
    });

    res.status(201).json({
      message: 'Message sent successfully!'
    });

  } catch (error) {

    console.error('Contact Error:', error);

    res.status(500).json({
      message: 'Failed to send message.'
    });
  }
});



app.post('/api/apply', contactLimiter, async (req, res) => {

  try {

    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      experience,
      message
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !position
    ) {
      return res.status(400).json({
        message: 'Please fill all required fields.'
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Invalid email address.'
      });
    }

    /* ---------- Save ---------- */

    const newApplication = new Apply({
      firstName,
      lastName,
      email,
      phone,
      position,
      experience,
      message
    });

    await newApplication.save();

    /* ---------- Notify HR ---------- */

    await transporter.sendMail({

      from: `"CHDK Website" <${process.env.EMAIL_USER}>`,

      to: process.env.HR_EMAIL,

      subject: `New Job Application: ${position}`,

      html: `
        <h2 style="color:#1a1a2e">
          New Job Application Received
        </h2>

        <table style="border-collapse:collapse;width:100%">

          <tr>
            <td style="padding:8px;border:1px solid #ddd">
              <strong>Name</strong>
            </td>

            <td style="padding:8px;border:1px solid #ddd">
              ${firstName} ${lastName}
            </td>
          </tr>

          <tr>
            <td style="padding:8px;border:1px solid #ddd">
              <strong>Email</strong>
            </td>

            <td style="padding:8px;border:1px solid #ddd">
              ${email}
            </td>
          </tr>

          <tr>
            <td style="padding:8px;border:1px solid #ddd">
              <strong>Phone</strong>
            </td>

            <td style="padding:8px;border:1px solid #ddd">
              ${phone || 'Not provided'}
            </td>
          </tr>

          <tr>
            <td style="padding:8px;border:1px solid #ddd">
              <strong>Position</strong>
            </td>

            <td style="padding:8px;border:1px solid #ddd">
              ${position}
            </td>
          </tr>

          <tr>
            <td style="padding:8px;border:1px solid #ddd">
              <strong>Experience</strong>
            </td>

            <td style="padding:8px;border:1px solid #ddd">
              ${experience || 'Not provided'}
            </td>
          </tr>

        </table>

        <p style="margin-top:16px">
          <strong>Message:</strong>
        </p>

        <p style="
          background:#f5f5f5;
          padding:12px;
          border-radius:4px;
        ">
          ${message || 'Not provided'}
        </p>
      `
    });

    /* ---------- Auto Reply ---------- */

    await transporter.sendMail({

      from: `"CHDK Technology Center" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: 'Application Received – CHDK Technology Center',

      html: `
        <p>Dear ${firstName},</p>

        <p>
          Thank you for applying for the
          <strong>${position}</strong> role.
        </p>

        <p>
          Our HR team will review your application
          and contact you if shortlisted.
        </p>

        <br>

        <p>
          Best regards,<br>
          <strong>HR Team</strong>
        </p>
      `
    });

    res.status(201).json({
      message: 'Application submitted successfully!'
    });

  } catch (error) {

    console.error('Apply Error:', error);

    res.status(500).json({
      message: 'Failed to submit application.'
    });
  }
});

/* ---------------- GLOBAL ERROR HANDLER ---------------- */

app.use((err, req, res, next) => {

  console.error(err.stack);

  res.status(500).json({
    message: 'Something went wrong.'
  });
});

/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});