const { Router } = require('express');
const Brand = require('../models/Brand');
const router = Router();
const { Schema } = require('mongoose');

// POST create /api/brand
router.post('/', async (req, res) => {
    try {
        const { name, category_id } = req.body;

        const existing = await Brand.findOne({ name });

        if (existing) {
            return res.status(400).json({ message: 'Brand already exists' });
        }

        const newBrand = new Brand({
            name,
            category_id
        });

        await newBrand.save();

        res.status(201).json({ message: 'Success create' });
    } catch (e) {
        res.status(500).json({ message: 'Error Brand create', error: e });
    }
});

// GET ALl /api/brand
router.get('/', async (req, res) => {
    try {
        const brands = await Brand.find();

        if (!brands.length) {
            return res.status(400).json({ message: 'Brands not found' });
        }

        res.json(brands);
    } catch (e) {
        res.status(500).json({ message: 'Error get Brands', error: e });
    }
});

// GET by category_id /api/brand/category/:id
router.get('/category/:id', async (req, res) => {
    try {
        const brands = await Brand.find({ category_id: req.params.id });

        if (!brands.length) {
            return res.status(400).json({ message: 'Brands not found' });
        }

        res.json(brands);
    } catch (e) {
        res.status(500).json({ message: 'Error get Brands', error: e });
    }
});

// GET by ID /api/brand/:id
router.get('/:id', async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);

        if (!brand) {
            return res.status(400).json({ message: 'Brand not found' });
        }

        res.json(brand);
    } catch (e) {
        res.status(500).json({ message: 'Error get Brand', error: e });
    }
});

// PUT Update by ID /api/brand/:id
router.put('/:id', async (req, res) => {
    try {
        const { name } = req.body;

        if (name) {
            await Brand.findOneAndUpdate(
              { _id: req.params.id },
              { $set: { "name": name } }
            );

            return res.json({ message: 'Success update' });
        }

        res.status(400).json({ message: 'Brand not updated' });
    } catch (e) {
        res.status(500).json({ message: 'Error update Brand', error: e });
    }
});

module.exports = router;
