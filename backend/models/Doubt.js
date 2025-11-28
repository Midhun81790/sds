const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    keywords: {
      type: [String],
      default: [],
    },
    similarityScores: [
      {
        doubt: { type: mongoose.Schema.Types.ObjectId, ref: 'Doubt' },
        score: Number,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    guestName: {
      type: String,
      trim: true,
    },
    guestEmail: {
      type: String,
      trim: true,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Doubt', doubtSchema);
