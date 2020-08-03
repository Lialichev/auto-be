const Advertisement = require('../models/Advertisement');
const Status = require('../models/Status');
const { validationResult } = require('express-validator');

exports.create = async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Data isn`t valid',
            })
        }

        const status = await Status.findOne({ name: "Moderation" });

        await new Advertisement({
            photos: req.body.photos,
            general: {
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
            },
            price: {
                value: req.body.price.value,
                currency: req.body.price.currency,
                auctions: req.body.price.auctions,
                exchangesAutoAllowed: req.body.price.exchangesAutoAllowed
            },
            description: req.body.description,
            additional_characteristics: {
                gearbox: req.body.additional_characteristics.gearbox,
                fuel: {
                    type: req.body.additional_characteristics.fuel.type,
                    city: req.body.additional_characteristics.fuel.city,
                    route: req.body.additional_characteristics.fuel.route,
                    combine: req.body.additional_characteristics.fuel.combine,
                },
                engine_volume_liters: req.body.additional_characteristics.engine_volume_liters,
                power: {
                    type: req.body.additional_characteristics.power.type,
                    value: req.body.additional_characteristics.power.value,
                },
                drive: req.body.additional_characteristics.drive,
                doors: req.body.additional_characteristics.doors,
                seats: req.body.additional_characteristics.seats,
                color: req.body.additional_characteristics.color,
                metallic: req.body.additional_characteristics.metallic,
                technical_condition: req.body.additional_characteristics.technical_condition,
                country_import: req.body.additional_characteristics.country_import,
            },
            contacts: {
                phone: req.body.contacts.phone
            },
            agreement: req.body.agreement,
            status: status,
            digits: req.body.digits
        }).save();

        res.status(201).json({ message: 'Success Advertisement create' });
    } catch (e) {
        res.status(500).json({ message: 'Error Advertisement create', error: e });
    }
};

exports.findAll = async (req, res) => {
    try {
        const page = req.query.page ? Number(req.query.page) : 0;
        const limit = req.query.limit ? Number(req.query.limit) : 10;

        const advertisement = await Advertisement.find()
            .sort({ _id: -1 })
            .limit(limit)
            .skip(limit * page);

        if (!advertisement.length) {
            return res.status(400).json({ message: 'Advertisement not found' });
        }

        const total = await Advertisement.estimatedDocumentCount();

        res.json({
            data: advertisement,
            page,
            limit,
            total
        });
    } catch (e) {
        res.status(500).json({ message: 'Error get Advertisement', error: e });
    }
};

exports.findOne = async (req, res) => {
    try {
        const advertisement = await Advertisement.findById(req.params.id);

        if (!advertisement) {
            return res.status(400).json({ message: 'Brand not found' });
        }

        res.json(advertisement);
    } catch (e) {
        res.status(500).json({ message: 'Error get Advertisement', error: e });
    }
};
