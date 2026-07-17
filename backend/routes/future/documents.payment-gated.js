// backend/routes/documents.js
const express = require('express');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');
const Razorpay = require('razorpay');

const Document = require('../models/Document');
const Purchase = require('../models/Purchase');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const PRIVATE_DOCS_PATH = path.join(__dirname, '..', 'private-docs');

const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { message: 'Too many requests. Please try again later.' }
});

/* ======= LIST DOCUMENTS (public metadata only, no file path) ====== */

router.get('/', async (req, res) => {
  try {
    const docs = await Document.find({ active: true }).select(
      'title slug category description price currency thumbnail'
    );
    res.json(docs);
  } catch (error) {
    console.error('List Documents Error:', error);
    res.status(500).json({ message: 'Failed to load documents.' });
  }
});

/* ======= CREATE RAZORPAY ORDER ====== */

router.post('/:slug/create-order', paymentLimiter, async (req, res) => {
  try {
    const { email, phone } = req.body;
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: 'A valid email is required.' });
    }

    const doc = await Document.findOne({ slug: req.params.slug, active: true });
    if (!doc) {
      return res.status(404).json({ message: 'Document not found.' });
    }

    const amountInPaise = Math.round(doc.price * 100);

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: doc.currency || 'INR',
      receipt: `doc_${doc._id}_${Date.now()}`,
      notes: { documentId: doc._id.toString(), email }
    });

    await new Purchase({
      document: doc._id,
      email,
      phone,
      razorpayOrderId: order.id,
      amount: doc.price,
      currency: doc.currency,
      status: 'created'
    }).save();

    res.json({
      orderId: order.id,
      amount: amountInPaise,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      documentTitle: doc.title
    });
  } catch (error) {
    console.error('Create Order Error:', error);
    res.status(500).json({ message: 'Failed to create payment order.' });
  }
});

/* ======= VERIFY PAYMENT & ISSUE DOWNLOAD TOKEN ====== */

router.post('/verify', paymentLimiter, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Missing payment details.' });
    }

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed.' });
    }

    const purchase = await Purchase.findOne({ razorpayOrderId: razorpay_order_id });
    if (!purchase) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    const downloadToken = crypto.randomBytes(24).toString('hex');

    purchase.status = 'paid';
    purchase.razorpayPaymentId = razorpay_payment_id;
    purchase.razorpaySignature = razorpay_signature;
    purchase.downloadToken = downloadToken;
    purchase.downloadTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
    await purchase.save();

    res.json({
      message: 'Payment verified.',
      downloadToken,
      documentId: purchase.document
    });
  } catch (error) {
    console.error('Verify Payment Error:', error);
    res.status(500).json({ message: 'Payment verification failed.' });
  }
});

/* ======= GATED DOWNLOAD ====== */

router.get('/:slug/download', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(401).json({ message: 'Missing download token.' });
    }

    const doc = await Document.findOne({ slug: req.params.slug, active: true });
    if (!doc) {
      return res.status(404).json({ message: 'Document not found.' });
    }

    const purchase = await Purchase.findOne({
      document: doc._id,
      downloadToken: token,
      status: 'paid'
    });

    if (!purchase) {
      return res.status(403).json({ message: 'Invalid or unauthorized download link.' });
    }

    if (purchase.downloadTokenExpiresAt < new Date()) {
      return res.status(410).json({ message: 'Download link has expired.' });
    }

    if (purchase.downloadCount >= purchase.maxDownloads) {
      return res.status(429).json({ message: 'Download limit reached for this purchase.' });
    }

    const filePath = path.join(PRIVATE_DOCS_PATH, doc.fileName);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File missing on server.' });
    }

    purchase.downloadCount += 1;
    await purchase.save();

    res.download(filePath, `${doc.title}.pdf`);
  } catch (error) {
    console.error('Download Error:', error);
    res.status(500).json({ message: 'Failed to download document.' });
  }
});

module.exports = router;
