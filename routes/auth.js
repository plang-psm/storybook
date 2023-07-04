const express = require('express');
const passport = require('passport');
const auth = require('../controllers/auth');

const router = express.Router();

//@desc Auth with Google
//@Route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

//@desc Google auth callback
//@Route GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  auth.getDashboard
);

//@desc Logout User
//@route /auth/logout
router.get('/logout', auth.getLogout);

module.exports = router;
