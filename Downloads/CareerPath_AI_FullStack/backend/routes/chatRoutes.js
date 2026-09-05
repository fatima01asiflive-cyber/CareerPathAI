const express = require('express');
const rateLimit = require('express-rate-limit');
const { chat } = require('../controllers/chatController');

const router = express.Router();
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many AI Coach requests. Please try again shortly.' }
});

router.post('/chat', limiter, chat);
router.post('/aiguider/chat', limiter, chat);

module.exports = router;
