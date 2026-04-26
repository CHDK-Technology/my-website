require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Contact = require('./models/Contact');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('CHDK API is running...');
});

// Contact Form POST Route
app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, enquiryType, message } = req.body;

    // Basic Validation: Ensure required fields aren't empty
    if (!firstName || !lastName || !email || !enquiryType || !message) {
      return res.status(400).json({ message: 'Please fill out all required fields.' });
    }

    // Create a new contact document
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      company,
      enquiryType,
      message
    });

    // Save it to MongoDB
    await newContact.save();

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is successfully running on port ${PORT}`);
});