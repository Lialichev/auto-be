const Category = require('../models/Category');

exports.create = async (req, res) => {
    try {
        const { name } = req.body;

        const existing = await Category.findOne({ name });

        if (existing) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const newCategory = new Category({ name });

        await newCategory.save();

        res.status(201).json({ message: 'Success create' });
    } catch (e) {
        res.status(500).json({ message: 'Error Category create', error: e });
    }
}

exports.findAll = async (req, res) => {
    try {
        const categories = await Category.find();

        if (!categories.length) {
            return res.status(400).json({ message: 'Categories not found' });
        }

        res.json(categories);
    } catch (e) {
        res.status(500).json({ message: 'Error get Categories', error: e });
    }
}

exports.findOne = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(400).json({ message: 'Category not found' });
        }

        res.json(category);
    } catch (e) {
        res.status(500).json({ message: 'Error get Category', error: e });
    }
}

exports.update = async (req, res) => {
    try {
        const { name } = req.body;

        if (name) {
            await Category.findByIdAndUpdate(req.params.id, { $set: { "name": name } });

            return res.json({ message: 'Success update' });
        }

        res.status(400).json({ message: 'Category not updated' });
    } catch (e) {
        res.status(500).json({ message: 'Error update Category', error: e });
    }
}
