const { Router } = require('express');
const router = Router();
const advertisement = require("../controllers/advertisement.controller");
const { check } = require('express-validator');

// POST create /api/advertisement
router.post(
  '/',
  [
    check('email').isEmail(),
    check('password').isLength({ min: 6 })
  ],
  advertisement.create
);

module.exports = router;
