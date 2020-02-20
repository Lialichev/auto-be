const { Router } = require('express');
const Book = require('../models/Book');
const auth = require('../middleware/auth.middleware');
const router = Router();

// /api/book/create
router.post('/create', auth, async (req, res) => {
  try {
    const { name, year } = req.body;

    const existing = await Book.findOne({ name });

    if (existing) {
      return res.json({ name: existing });
    }

    const newBook = new Book({
      name,
      year,
      followers: req.user.user_id,
      creator: req.user.user_id,
    });

    await newBook.save();

    res.status(201).json({ newBook });
  } catch (e) {
    res.status(500).json({ message: 'Error book create' });
  }
});

// /api/book/follow
router.post('/follow', auth, async (req, res) => {
  try {
    const { id } = req.body;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ book });
    }

    if (book.followers.includes(req.user.user_id)) {
      return res.json({ book });
    }

    book.followers.push(req.user.user_id);

    await book.save();

    res.status(201).json({ book });
  } catch (e) {
    res.status(500).json({ message: 'Error follow' });
  }
});

// /api/book/unfollow
router.post('/unfollow', auth, async (req, res) => {
  try {
    const { id } = req.body;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ book });
    }

    if (req.user.user_id === book.creator.toString()) {
      return res.status(403).json({ message: 'User is creator' });
    }

    if (!book.followers.includes(req.user.user_id)) {
      return res.json({ book });
    }

    const index = book.followers.indexOf(req.user.user_id);

    book.followers.splice(index, 1);

    await book.save();

    res.status(201).json({ book });
  } catch (e) {
    res.status(500).json({ message: 'Error unfollow' });
  }
});

module.exports = router;