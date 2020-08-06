const range = require('../helpers/range.helper');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    req.filter = {};

    // Main Filter
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
        req.filter['general.region'] = {
            $in: req.query.region
        };
    }

    if (req.query.from_year || req.query.to_year) {
        req.filter['general.year'] = range(req.query.from_year, req.query.to_year);
    }

    if (req.query.min_price || req.query.max_price) {
        req.filter['price.value'] = range(req.query.min_price, req.query.max_price);
    }

    // Advance
    if (req.query.body_type) {
        req.filter['general.body_type'] = {
            $in: req.query.body_type
        };
    }

    if (req.query.auctions === 'true') {
        req.filter['price.auctions'] = true;
    }

    if (req.query.exchangesAutoAllowed === 'true') {
        req.filter['price.exchangesAutoAllowed'] = true;
    }

    if (req.query.only_photo === 'true') {
        req.filter['photos'] = { $exists: true, $ne: [] };
    }

    if (req.query.city) {
        req.filter['general.city'] = {
            $in: req.query.city
        };
    }

    if (req.query.min_mileage || req.query.max_mileage) {
        req.filter['general.mileage'] = range(req.query.min_mileage, req.query.max_mileage);
    }

    if (req.query.gearbox) {
        req.filter['additional_characteristics.gearbox'] = {
            $in: req.query.gearbox
        };
    }

    if (req.query.fuel_type) {
        req.filter['additional_characteristics.fuel.type'] = {
            $in: req.query.fuel_type
        };
    }

    if (req.query.min_fuel_city || req.query.max_fuel_city) {
        req.filter['additional_characteristics.fuel.city'] = range(req.query.min_fuel_city, req.query.max_fuel_city);
    }

    if (req.query.min_fuel_route || req.query.max_fuel_route) {
        req.filter['additional_characteristics.fuel.route'] = range(req.query.min_fuel_route, req.query.max_fuel_route);
    }

    if (req.query.min_fuel_combine || req.query.max_fuel_combine) {
        req.filter['additional_characteristics.fuel.combine'] = range(req.query.min_fuel_combine, req.query.max_fuel_combine);
    }

    if ((req.query.min_power || req.query.max_power) && req.query.power_type) {
        req.filter['additional_characteristics.power'] = {
            $and: [
                { type: req.query.power_type },
                { value: range(req.query.min_power, req.query.max_power) }
            ]
        };
    }

    if (req.query.drive) {
        req.filter['additional_characteristics.drive'] = {
            $in: req.query.drive
        };
    }

    if (req.query.doors) {
        req.filter['additional_characteristics.doors'] = {
            $in: req.query.doors
        };
    }

    if (req.query.seats) {
        req.filter['additional_characteristics.seats'] = {
            $in: req.query.seats
        };
    }

    if (req.query.color) {
        req.filter['additional_characteristics.color'] = {
            $in: req.query.color
        };
    }

    if (req.query.metallic === 'true') {
        req.filter['additional_characteristics.metallic'] = true;
    }

    if (req.query.technical_condition) {
        req.filter['additional_characteristics.technical_condition'] = {
            $in: req.query.technical_condition
        };
    }

    if (req.query.country_import) {
        req.filter['additional_characteristics.country_import'] = {
            $in: req.query.country_import
        };
    }

    next();
};
