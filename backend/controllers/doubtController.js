const Doubt = require('../models/Doubt');
const Reply = require('../models/Reply');
const { extractKeywords, getSimilarityScore } = require('../utils/textSimilarity');
const { predictTags } = require('../utils/tagPredictor');

const escapeRegex = (value = '') => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildFilterQuery = ({ search, tag }) => {
  const query = {};

  if (tag) {
    query.tags = { $regex: new RegExp(`^${escapeRegex(tag)}$`, 'i') };
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $regex: search, $options: 'i' } },
    ];
  }

  return query;
};

const createDoubt = async (req, res) => {
  try {
    const { title, description, tags = [], guestName, guestEmail } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const keywords = extractKeywords(`${title} ${description}`);
    const predictedTags = predictTags(keywords);
    const combinedTags = Array.from(new Set([...tags, ...predictedTags]));

    const existingDoubts = await Doubt.find().select('title description');
    const similarities = existingDoubts
      .map((doubt) => ({
        doubt,
        score: getSimilarityScore(`${title} ${description}`, `${doubt.title} ${doubt.description}`),
      }))
      .filter(({ score }) => score >= 0.25)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ doubt, score }) => ({
        doubt: doubt._id,
        score,
      }));

    const doubt = await Doubt.create({
      title,
      description,
      tags: combinedTags,
      keywords,
      createdBy: req.user?._id,
      guestName: req.user ? undefined : guestName || 'Anonymous',
      guestEmail: req.user ? undefined : guestEmail,
      similarityScores: similarities,
    });

    return res.status(201).json({
      doubt,
      autoTags: predictedTags,
      similarDoubts: similarities,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getDoubts = async (req, res) => {
  try {
    const query = buildFilterQuery(req.query);
    const doubts = await Doubt.find(query)
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email');

    return res.json(doubts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getDoubtById = async (req, res) => {
  try {
    const doubt = await Doubt.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('similarityScores.doubt', 'title tags');

    if (!doubt) {
      return res.status(404).json({ message: 'Doubt not found' });
    }

    const replies = await Reply.find({ doubt: doubt._id })
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email');

    return res.json({ doubt, replies });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getSimilarDoubts = async (req, res) => {
  try {
    const doubt = await Doubt.findById(req.params.id).populate('similarityScores.doubt', 'title tags');

    if (!doubt) {
      return res.status(404).json({ message: 'Doubt not found' });
    }

    return res.json(doubt.similarityScores);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const upvoteDoubt = async (req, res) => {
  try {
    const doubt = await Doubt.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );

    if (!doubt) {
      return res.status(404).json({ message: 'Doubt not found' });
    }

    return res.json(doubt);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createDoubt,
  getDoubts,
  getDoubtById,
  getSimilarDoubts,
  upvoteDoubt,
};
