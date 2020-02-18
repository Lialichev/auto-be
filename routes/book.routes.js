const { Router } = require('express');
const Book = require('../models/Book');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/create', auth, async (req, res) => {
  try {
    const { name, year } = req.body;

    const existing = await Book.findOne({ name });

    if (existing) {
      return res.json({ name: existing });
    }

    console.log(req.user.user_id);

    const newBook = new Book({
      name, year, followers: req.user.user_id
    });

    await newBook.save();

    res.status(201).json({ newBook });
  } catch (e) {
    res.status(500).json({ message: 'Error book create' });
  }
});

module.exports = router;