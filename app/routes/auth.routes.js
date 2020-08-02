const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const { check } = require('express-validator');
const authUser = require('../controllers/auth.controller');
const router = Router();

// /api/auth/sign-up
router.post(
  '/sign-up',
  [
    check('email', 'Email isn`t valid').isEmail(),
    check('password', 'Password length isn`t valid')
      .isLength({ min: 6 })
  ],
  authUser.signUp
);

// /api/auth/sign-in
router.post(
  '/sign-in',
  [
    check('email', 'Data isn`t valid').normalizeEmail().isEmail(),
    check('password', 'Data isn`t valid').exists()
  ],
  authUser.signIn
);

// /api/auth/sign-in-me-token
router.get('/sign-in-me-token', auth, authUser.signInToken);

module.exports = router;