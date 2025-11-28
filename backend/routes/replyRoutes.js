const express = require('express');
const { addReply, getReplies } = require('../controllers/replyController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/:doubtId').post(protect, addReply).get(getReplies);

module.exports = router;
