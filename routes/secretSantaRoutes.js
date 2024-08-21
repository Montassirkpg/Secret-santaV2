const express = require('express');
const { assignSanta } = require('../controllers/secretSantaController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:groupId/secret-santa', protect, assignSanta);

module.exports = router;
