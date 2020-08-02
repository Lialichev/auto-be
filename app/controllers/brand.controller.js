const Brand = require('../models/Brand');

exports.create = async (req, res) => {
    try {
        const { name, category_id } = req.body;

        await new Brand({ name, category_id }).save();

        res.status(201).json({ message: 'Success create' });
    } catch (e) {
        res.status(500).json({ message: 'Error Brand create', error: e });
    }
};

exports.findAll = async (req, res) => {
    try {
        const brands = await Brand.find();

        if (!brands.length) {
            return res.status(400).json({ message: 'Brands not found' });
        }

        res.json(brands);
    } catch (e) {
        res.status(500).json({ message: 'Error get Brands', error: e });
    }
};

exports.findByCategory = async (req, res) => {
    try {
        const brands = await Brand.find({ category_id: req.params.id });

        if (!brands.length) {
            return res.status(400).json({ message: 'Brands not found' });
        }

        res.json(brands);
    } catch (e) {
        res.status(500).json({ message: 'Error get Brands', error: e });
    }
};

exports.findOne = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);

        if (!brand) {
            return res.status(400).json({ message: 'Brand not found' });
        }

        res.json(brand);
    } catch (e) {
        res.status(500).json({ message: 'Error get Brand', error: e });
    }
};

exports.update = async (req, res) => {
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
};
