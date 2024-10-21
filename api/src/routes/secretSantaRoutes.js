const express = require('express');
const { assignSecretSanta } = require('../controllers/secretSantaController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router({ mergeParams: true });

router.post('/', authMiddleware, assignSecretSanta);

// Other Secret Santa routes...

module.exports = router;