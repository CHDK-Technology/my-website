// backend/models/Document.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // e.g. "solar-dryer-brochure"
  category: {
    type: String,
    enum: ['brochure', 'catalogue', 'sop', 'recipe-book'],
    required: true
  },
  description: { type: String, required: false },
  price: { type: Number, required: true },        // in INR, e.g. 199
  currency: { type: String, default: 'INR' },
  fileName: { type: String, required: true },      // actual filename inside backend/private-docs
  previewFileName: { type: String, required: false }, // optional short/watermarked preview PDF, also inside backend/private-docs
  thumbnail: { type: String, required: false },    // optional public preview image path
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', documentSchema);
