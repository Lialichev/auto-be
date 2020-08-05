const range = require('../helpers/range.helper');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    req.filter = {};

    if (req.query.category) {
        req.filter['general.category'] = req.query.category;
    }

    if (req.query.brand) {
        req.filter['general.brand'] = req.query.brand;
    }

    if (req.query.model) {
        req.filter['general.model'] = req.query.model;
    }

    if (req.query.region) {
        req.filter['general.region'] = req.query.region;
    }

    if (req.query.from_year || req.query.to_year) {
        req.filter['general.year'] = range(req.query.from_year, req.query.to_year);
    }

    if (req.query.min_price || req.query.max_price) {
        req.filter['price.value'] = range(req.query.min_price, req.query.max_price);
    }

    next();
};
