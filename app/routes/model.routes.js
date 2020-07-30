const { Router } = require('express');
const Model = require('../models/Model');
const router = Router();

// POST create /api/model
router.post('/', async (req, res) => {
  try {
    const { name, brand_id } = req.body;

    await new Model({ name, brand_id }).save();

    res.status(201).json({ message: 'Success create' });
  } catch (e) {
    res.status(500).json({ message: 'Error Model create', error: e });
  }
});

// GET ALl /api/model
router.get('/', async (req, res) => {
  try {
    const models = await Model.find();

    if (!models.length) {
      return res.status(400).json({ message: 'Models not found' });
    }

    res.json(models);
  } catch (e) {
    res.status(500).json({ message: 'Error get Models', error: e });
  }
});

// GET by brand_id /api/model/brand/:id
router.get('/brand/:id', async (req, res) => {
  try {
    const models = await Model.find({ brand_id: req.params.id });

    if (!models.length) {
      return res.status(400).json({ message: 'Models not found' });
    }

    res.json(models);
  } catch (e) {
    res.status(500).json({ message: 'Error get Models', error: e });
  }
});

// GET by ID /api/model/:id
router.get('/:id', async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);

    if (!model) {
      return res.status(400).json({ message: 'Model not found' });
    }

    res.json(model);
  } catch (e) {
    res.status(500).json({ message: 'Error get Model', error: e });
  }
});

// PUT Update by ID /api/model/:id
router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;

    if (name) {
      await Model.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { "name": name } }
      );

      return res.json({ message: 'Success update' });
    }

    res.status(400).json({ message: 'Model not updated' });
  } catch (e) {
    res.status(500).json({ message: 'Error update Model', error: e });
  }
});

module.exports = router;
