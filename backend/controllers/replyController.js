const Reply = require('../models/Reply');

const addReply = async (req, res) => {
  try {
    const { text } = req.body;
    const { doubtId } = req.params;

    if (!text) {
      return res.status(400).json({ message: 'Reply text is required' });
    }

    const reply = await Reply.create({
      text,
      doubt: doubtId,
      createdBy: req.user._id,
    });

    const populatedReply = await reply.populate('createdBy', 'name email');

    return res.status(201).json(populatedReply);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getReplies = async (req, res) => {
  try {
    const replies = await Reply.find({ doubt: req.params.doubtId })
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email');

    return res.json(replies);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addReply,
  getReplies,
};
