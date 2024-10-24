const express = require('express');
const { createGroup } = require('../controllers/groupController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createGroup);

// Other group routes...

module.exports = router;