const Region = require('../models/Region');

exports.findAll = async (req, res) => {
    try {
        const regions = await Region.find();

        if (!regions.length) {
            return res.status(400).json({ message: 'Regions not found' });
        }

        res.json(regions);
    } catch (e) {
        res.status(500).json({ message: 'Error get Regions', error: e });
    }
};
