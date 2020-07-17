const { Router } = require('express');
const Brand = require('../models/Brand');
const router = Router();
const { Schema } = require('mongoose');

// /api/brand
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
//
// // /api/brand
// router.get('/', async (req, res) => {
//     try {
//         const categories = await Category.find();
//
//         if (!categories.length) {
//             return res.status(400).json({ message: 'Categories not found' });
//         }
//
//         res.json(categories);
//     } catch (e) {
//         res.status(500).json({ message: 'Error get Categories', error: e });
//     }
// });
//
// // /api/brand/:id
// router.get('/:id', async (req, res) => {
//     try {
//         const category = await Category.findById(req.params.id);
//
//         if (!category) {
//             return res.status(400).json({ message: 'Category not found' });
//         }
//
//         res.json(category);
//     } catch (e) {
//         res.status(500).json({ message: 'Error get Category', error: e });
//     }
// });
//
// // /api/brand/:id
// router.put('/:id', async (req, res) => {
//     try {
//         const { name } = req.body;
//
//         if (name) {
//             await Category.findOneAndUpdate(
//                 { _id: req.params.id },
//                 { $set: { "name": name } }
//             );
//
//             return res.json({ message: 'Success update' });
//         }
//
//         res.status(400).json({ message: 'Category not updated' });
//     } catch (e) {
//         res.status(500).json({ message: 'Error update Category', error: e });
//     }
// });

module.exports = router;
