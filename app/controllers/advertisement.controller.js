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
const get = require('lodash/get');
const find = require('lodash/find');
const axios = require('axios');

exports.create = async (req, res) => {
  try {

    let general = {};
    let price = {};
    let additional_characteristics = {};
    let contacts = {};
    let num_info = {};

    if (req.body.general) {
      general = {
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

    if (req.body.price) {
      price = {
        value: req.body.price.value,
        currency: req.body.price.currency,
        auctions: req.body.price.auctions,
        exchangesAutoAllowed: req.body.price.exchangesAutoAllowed
      };
    }

    if (req.body.contacts) {
      contacts = {
        phone: req.body.contacts.phone
      };
    }

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

      additional_characteristics = {
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

    if (req.body.digits) {
      const autoInfo = await axios(encodeURI(`https://baza-gai.com.ua/nomer/${ req.body.digits }`), {
        headers: {
          "Accept": "application/json"
        }
      });

      const data = autoInfo.data;

      if (data) {
        num_info = {
          stolen: data.stolen,
          year: Number(data.year),
          last_operation: get(find(data.operations, { 'isLast': true }), 'regAt'),
          brand: data.vendor,
          model: data.model,
        };
      }
    }

    const status = await Status.findOne({ name: "Moderation" });

    await new Advertisement({
      photos: req.body.photos,
      general,
      price,
      description: req.body.description,
      additional_characteristics,
      contacts,
      agreement: req.body.agreement,
      status: status,
      digits: req.body.digits,
      num_info
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

    const advertisement = await Advertisement.find()
      .sort({ [sort]: order_sort })
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
