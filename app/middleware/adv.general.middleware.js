module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    req.general = {};

    if (req.body.general) {
        req.general = {
            category: req.body.general.category,
            brand: req.body.general.brand,
            model: req.body.general.model,
            year: req.body.general.year,
            modification: req.body.general.modification,
            body_type: req.body.general.body_type,
            mileage: req.body.general.mileage,
            region: req.body.general.region,
            city: req.body.general.city,
            VIN: req.body.general.VIN,
        };
    }

    next();
};
