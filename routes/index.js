const express = require('express');
const router = express.Router();
const index = require('../controllers/index');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureGuest, index.getHome);
router.get('/dashboard', ensureAuth, index.getDashboard);

module.exports = router;
