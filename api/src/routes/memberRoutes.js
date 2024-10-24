const express = require('express');
const { addMember } = require('../controllers/memberController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router({ mergeParams: true });

router.post('/', authMiddleware, addMember);

// Other member routes...

module.exports = router;