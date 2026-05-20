require('dotenv').config();

const multer = require("multer");
const path = require("path");
const fs = require("fs");
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

// app.use(helmet());

/* ---------------- BODY PARSING ---------------- */

app.use((req, res, next) => {
  if (req.headers['content-type']?.startsWith('multipart/form-data')) {
    return next();
  }
  express.json()(req, res, next);
});

app.use((req, res, next) => {
  if (req.headers['content-type']?.startsWith('multipart/form-data')) {
    return next();
  }
  express.urlencoded({ extended: true })(req, res, next);
});

/* ---------------- CORS ---------------- */

const allowedOrigins = [
  'http://localhost:3000',
  'https://your-real-domain.com',
  'https://www.your-real-domain.com'
];

app.use(cors({
  origin: true,
  credentials: true,
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
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ---------------- FILE UPLOAD ---------------- */

const uploadPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

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

/* ======= CONTACT API ====== */

app.post(
  '/api/contact',
  contactLimiter,
  upload.single("resume"),
  async (req, res) => {
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

      if (!firstName || !lastName || !email || !enquiryType || !message) {
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

      /* ---------- Save to MongoDB + Send Emails in Parallel ---------- */

      await Promise.all([

        new Contact({
          firstName,
          lastName,
          email,
          phone,
          company,
          enquiryType,
          message
        }).save(),

        transporter.sendMail({
          from: `"CHDK Website" <${process.env.EMAIL_USER}>`,
          to: ["sales-pune@chdkindia.com", "info@chdkindia.com"],
          subject: `New Contact Form: ${enquiryType}`,
          html: `
            <h2 style="color:#1a1a2e">New Contact Form Submission</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr>
                <td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td>
                <td style="padding:8px;border:1px solid #ddd">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td>
                <td style="padding:8px;border:1px solid #ddd">${email}</td>
              </tr>
              <tr>
                <td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td>
                <td style="padding:8px;border:1px solid #ddd">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding:8px;border:1px solid #ddd"><strong>Company</strong></td>
                <td style="padding:8px;border:1px solid #ddd">${company || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding:8px;border:1px solid #ddd"><strong>Enquiry Type</strong></td>
                <td style="padding:8px;border:1px solid #ddd">${enquiryType}</td>
              </tr>
            </table>
            <p style="margin-top:16px"><strong>Message:</strong></p>
            <p style="background:#f5f5f5;padding:12px;border-radius:4px;">${message}</p>
          `
        }),

        transporter.sendMail({
          from: `"CHDK Technology Center" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Thank you for contacting CHDK Technology Center',
          html: `
            <p>Dear ${firstName},</p>
            <p>Thank you for reaching out to <strong>CHDK Technology Center</strong>.</p>
            <p>We have received your message and will respond within 24 hours.</p>
            <p>For urgent enquiries contact: <a href="mailto:info@chdkindia.com">info@chdkindia.com</a></p>
            <br>
            <p>Best regards,<br><strong>CHDK Technology Center Team</strong></p>
          `
        }),

      ]);

      res.status(201).json({ message: 'Message sent successfully!' });

    } catch (error) {
      console.error('Contact Error:', error);
      res.status(500).json({ message: 'Failed to send message.' });
    }
  }
);

/* ======= APPLY API ====== */

app.post(
  '/api/apply',
  contactLimiter,
  upload.single("resume"),
  async (req, res) => {
    try {

      const resumeFile = req.file;

      const {
        firstName,
        lastName,
        email,
        phone,
        position,
        experience,
        message
      } = req.body;

      /* ---------- Validation ---------- */

      if (!firstName || !lastName || !email || !position) {
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

      /* ---------- Save to MongoDB + Send Emails in Parallel ---------- */

      await Promise.all([

        new Apply({
          firstName,
          lastName,
          email,
          phone,
          position,
          experience,
          message,
          resume: resumeFile ? resumeFile.filename : ""
        }).save(),

        transporter.sendMail({
          from: `"CHDK Website" <${process.env.EMAIL_USER}>`,
          to: process.env.HR_EMAIL.split(","),
          subject: `New Job Application: ${position}`,
          html: `
            <h2 style="color:#1a1a2e">New Job Application Received</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr>
                <td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td>
                <td style="padding:8px;border:1px solid #ddd">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td>
                <td style="padding:8px;border:1px solid #ddd">${email}</td>
              </tr>
              <tr>
                <td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td>
                <td style="padding:8px;border:1px solid #ddd">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding:8px;border:1px solid #ddd"><strong>Position</strong></td>
                <td style="padding:8px;border:1px solid #ddd">${position}</td>
              </tr>
              <tr>
                <td style="padding:8px;border:1px solid #ddd"><strong>Experience</strong></td>
                <td style="padding:8px;border:1px solid #ddd">${experience || 'Not provided'}</td>
              </tr>
            </table>
            <p style="margin-top:16px"><strong>Message:</strong></p>
            <p style="background:#f5f5f5;padding:12px;border-radius:4px;">${message || 'Not provided'}</p>
          `,
          attachments: resumeFile
            ? [{ filename: resumeFile.originalname, path: resumeFile.path }]
            : []
        }),

        transporter.sendMail({
          from: `"CHDK Technology Center" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Application Received – CHDK Technology Center',
          html: `
            <p>Dear ${firstName},</p>
            <p>Thank you for applying for the <strong>${position}</strong> role.</p>
            <p>Our HR team will review your application and contact you if shortlisted.</p>
            <br>
            <p>Best regards,<br><strong>HR Team</strong></p>
          `
        }),

      ]);

      res.status(201).json({ message: 'Application submitted successfully!' });

    } catch (error) {
      console.error('Apply Error:', error);
      res.status(500).json({ message: 'Failed to submit application.' });
    }
  }
);

/* ---------------- GLOBAL ERROR HANDLER ---------------- */

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong.' });
});

/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});