require('dotenv').config();
const mongoose = require('mongoose');
const Document = require('../models/Document');

const sampleDocs = [
  {
    title: 'Company SOP',
    slug: 'comp-sop',
    category: 'sop',
    description: 'Standard Operating Procedure document.',
    price: 149,
    fileName: 'comp-sop.pdf'
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');
  for (const doc of sampleDocs) {
    await Document.findOneAndUpdate(
      { slug: doc.slug },
      doc,
      { upsert: true, new: true }
    );
    console.log(`Upserted: ${doc.title}`);
  }
  await mongoose.disconnect();
  console.log('Done.');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});