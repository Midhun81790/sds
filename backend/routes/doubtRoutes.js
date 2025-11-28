const express = require('express');
const {
  createDoubt,
  getDoubts,
  getDoubtById,
  getSimilarDoubts,
  upvoteDoubt,
} = require('../controllers/doubtController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(createDoubt).get(getDoubts);
router.get('/:id/similar', getSimilarDoubts);
router.route('/:id').get(getDoubtById);
router.post('/:id/upvote', protect, upvoteDoubt);

module.exports = router;
