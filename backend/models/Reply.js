const mongoose = require('mongoose');

const replySchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    doubt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doubt',
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reply', replySchema);
