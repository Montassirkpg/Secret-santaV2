const express = require('express');
const { createGroup, getGroups } = require('../controllers/groupController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, createGroup).get(protect, getGroups);

module.exports = router;
