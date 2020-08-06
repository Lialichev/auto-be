module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    req.additional_characteristics = {};

    if (req.body.additional_characteristics) {

        let fuel = {};
        let power = {};

        if (req.body.additional_characteristics.fuel) {
            fuel = {
                type: req.body.additional_characteristics.fuel.type,
                city: req.body.additional_characteristics.fuel.city,
                route: req.body.additional_characteristics.fuel.route,
                combine: req.body.additional_characteristics.fuel.combine,
            };
        }

        if (req.body.additional_characteristics.power) {
            power = {
                type: req.body.additional_characteristics.power.type,
                value: req.body.additional_characteristics.power.value,
            };
        }

        req.additional_characteristics = {
            gearbox: req.body.additional_characteristics.gearbox,
            fuel,
            engine_volume_liters: req.body.additional_characteristics.engine_volume_liters,
            power,
            drive: req.body.additional_characteristics.drive,
            doors: req.body.additional_characteristics.doors,
            seats: req.body.additional_characteristics.seats,
            color: req.body.additional_characteristics.color,
            metallic: req.body.additional_characteristics.metallic,
            technical_condition: req.body.additional_characteristics.technical_condition,
            country_import: req.body.additional_characteristics.country_import,
        };
    }

    next();
};
