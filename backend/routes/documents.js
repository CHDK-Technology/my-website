// backend/routes/documents.js
//
// Stage 1: catalogue listing only — no payment dependency, safe to deploy
// as-is. The payment-gated version (Razorpay order/verify/download) lives
// in backend/routes/future/documents.payment-gated.js — swap this file for
// that one once Razorpay is ready to go (see RESOURCES_FEATURE_SETUP.md).

const express = require('express');
const path = require('path');
const fs = require('fs');
const Document = require('../models/Document');

const router = express.Router();

const PRIVATE_DOCS_PATH = path.join(__dirname, '..', 'private-docs');

router.get('/', async (req, res) => {
  try {
    const docs = await Document.find({ active: true }).select(
      'title slug category description price currency thumbnail previewFileName'
    );
    // Expose only whether a preview exists, never the real fileName/path
    const withPreviewFlag = docs.map((doc) => ({
      _id: doc._id,
      title: doc.title,
      slug: doc.slug,
      category: doc.category,
      description: doc.description,
      price: doc.price,
      currency: doc.currency,
      thumbnail: doc.thumbnail,
      hasPreview: Boolean(doc.previewFileName),
    }));
    res.json(withPreviewFlag);
  } catch (error) {
    console.error('List Documents Error:', error);
    res.status(500).json({ message: 'Failed to load documents.' });
  }
});

// Public preview — only serves the file if the document has a previewFileName set.
// This is intentionally separate from the full paid document (never exposed here).
router.get('/:slug/preview', async (req, res) => {
  try {
    const doc = await Document.findOne({ slug: req.params.slug, active: true });
    if (!doc || !doc.previewFileName) {
      return res.status(404).json({ message: 'No preview available for this document.' });
    }

    const filePath = path.join(PRIVATE_DOCS_PATH, doc.previewFileName);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Preview file missing on server.' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${doc.title}-preview.pdf"`);
    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    console.error('Preview Error:', error);
    res.status(500).json({ message: 'Failed to load preview.' });
  }
});

module.exports = router;
