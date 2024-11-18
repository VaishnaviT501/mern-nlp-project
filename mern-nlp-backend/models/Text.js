// models/Text.js
const mongoose = require('mongoose');

const TextSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  sentiment: {
    type: String,
    required: true,
  },
  sentimentScore: {
    type: Number,
    required: true,
  },
});

const Text = mongoose.model('Text', TextSchema);
module.exports = Text;
