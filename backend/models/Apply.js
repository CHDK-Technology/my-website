const mongoose = require('mongoose');

const applySchema = new mongoose.Schema({
  firstName:  { type: String, required: true, trim: true },
  lastName:   { type: String, required: true, trim: true },
  email:      { type: String, required: true, trim: true, lowercase: true },
  phone:      { type: String, trim: true },
  position:   { type: String, required: true, trim: true },
  experience: { type: String, trim: true },
  message:    { type: String, trim: true },
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Apply', applySchema);