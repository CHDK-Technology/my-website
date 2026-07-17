// backend/models/Purchase.js
const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },

  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },

  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },

  downloadToken: { type: String },       // set only after successful verification
  downloadTokenExpiresAt: { type: Date },
  downloadCount: { type: Number, default: 0 },
  maxDownloads: { type: Number, default: 5 },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Purchase', purchaseSchema);
