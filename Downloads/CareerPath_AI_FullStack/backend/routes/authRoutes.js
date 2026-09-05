const express = require('express');
const { me, upsertProfile } = require('../controllers/authController');
const { firebaseProtect } = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/me', firebaseProtect, me);
router.get('/profile', firebaseProtect, me);
router.put('/profile', firebaseProtect, upsertProfile);
router.patch('/profile', firebaseProtect, upsertProfile);

module.exports = router;
