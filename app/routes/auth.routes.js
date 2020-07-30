const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth.middleware');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/sign-up
router.post(
  '/sign-up',
  [
    check('email', 'Email isn`t valid').isEmail(),
    check('password', 'Password length isn`t valid')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      console.log(req.body);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Data isn`t valid',
        })
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'User is registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: 'User saved' });

    } catch (e) {
      res.status(500).json({ message: 'Error sign up' });
    }
  }
);

// /api/auth/sign-in
router.post(
  '/sign-in',
  [
    check('email', 'Data isn`t valid').normalizeEmail().isEmail(),
    check('password', 'Data isn`t valid').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Data isn`t valid',
        })
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User isn`t defined' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Error auth' })
      }

      const token = jwt.sign({ user_id: user.id }, config.get('jwtSecret'), { expiresIn: '1h' });

      res.json({
        token,
        user_id: user.id
      });

    } catch (e) {
      res.status(500).json({ message: 'Error auth' })
    }
  }
);

// /api/auth/sign-in
router.get('/sign-in-me-token', auth, async (req, res) => {
    try {

      const user = await User.findById(req.user.user_id);

      if (!user) {
        return res.status(401).json({ message: 'User isn`t defined' });
      }

      res.json({ user_id: user.id });

    } catch (e) {
      res.status(500).json({ message: 'Error auth' })
    }
  }
);

module.exports = router;