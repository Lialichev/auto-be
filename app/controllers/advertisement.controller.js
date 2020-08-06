const Advertisement = require('../models/Advertisement');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Model = require('../models/Model');
const Region = require('../models/Region');
const City = require('../models/City');
const Currency = require('../models/Currency');
const Fuel = require('../models/Fuel');
const PowerType = require('../models/PowerType');
const Status = require('../models/Status');
const Gearbox = require('../models/Gearbox');
const EngineVolumeLiters = require('../models/EngineVolumeLiters');
const Drive = require('../models/Drive');
const Color = require('../models/Color');
const TechnicalCondition = require('../models/TechnicalCondition');
const Country = require('../models/Country');

exports.create = async (req, res) => {
    try {
        const status = await Status.findOne({ name: "Moderation" });

        await new Advertisement({
            photos: req.body.photos,
            general: req.general,
            price: req.price,
            description: req.body.description,
            additional_characteristics: req.additional_characteristics,
            contacts: req.contacts,
            agreement: req.body.agreement,
            status,
            digits: req.body.digits,
            num_info: req.num_info
        }).save();

        res.status(201).json({ message: 'Success Advertisement create' });
    } catch (e) {
        res.status(500).json({ message: 'Error Advertisement create', error: e });
    }
};

exports.findAll = async (req, res) => {
    try {
        const maxLimit = 100;

        const page = req.query.page ? Number(req.query.page) : 0;
        const limit = req.query.limit
            ? (Number(req.query.limit) <= maxLimit ? Number(req.query.limit) : maxLimit)
            : 20;
        const sort = req.query.sort ? req.query.sort : '_id';
        const order_sort = req.query.order_sort ? req.query.order_sort : -1;

        const advertisement = await Advertisement.find(req.filter)
            .sort({ [sort]: order_sort })
            .limit(limit)
            .skip(limit * page);

        if (!advertisement.length) {
            return res.status(400).json({ message: 'Advertisement not found' });
        }

        const total = await Advertisement.countDocuments(req.filter);

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
        const advertisement = await Advertisement.findById(req.params.id)
            .populate([
                {
                    path: 'general',
                    populate: [

                        {
                            path: "category",
                            model: Category,
                        },
                        {
                            path: "brand",
                            model: Brand,
                        },
                        {
                            path: "model",
                            model: Model,
                        },
                        {
                            path: "region",
                            model: Region,
                        },
                        {
                            path: "city",
                            model: City,
                        },
                    ]
                },
                {
                    path: 'price',
                    populate: [
                        {
                            path: "currency",
                            model: Currency,
                        },
                    ]
                },
                {
                    path: 'status',
                    model: Status,
                },
                {
                    path: 'additional_characteristics',
                    populate: [
                        {
                            path: "fuel.type",
                            model: Fuel,
                        },
                        {
                            path: "power.type",
                            model: PowerType,
                        },
                        {
                            path: "gearbox",
                            model: Gearbox,
                        },
                        {
                            path: "engine_volume_liters",
                            model: EngineVolumeLiters,
                        },
                        {
                            path: "drive",
                            model: Drive,
                        },
                        {
                            path: "color",
                            model: Color,
                        },
                        {
                            path: "technical_condition",
                            model: TechnicalCondition,
                        },
                        {
                            path: "country_import",
                            model: Country,
                        },
                    ]
                },
            ]);

        if (!advertisement) {
            return res.status(400).json({ message: 'Advertisement not found' });
        }

        res.json(advertisement);
    } catch (e) {
        res.status(500).json({ message: 'Error get Advertisement', error: e });
    }
};
