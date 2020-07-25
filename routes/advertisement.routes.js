const { Router } = require('express');
const Advertisement = require('../models/Advertisement');
const Status = require('../models/Status');
const router = Router();

// POST create /api/advertisement
router.post('/', async (req, res) => {
  try {

    const status = await Status.findOne({ name: "Moderation" });

    await new Advertisement({
      photos: req.body.photos,
      general: {
        category_id: req.body.general.category_id,
        brand_id: req.body.general.brand_id,
        model_id: req.body.general.model_id,
        year: req.body.general.year,
        modification: req.body.general.modification,
        body_type_id: req.body.general.body_type_id,
        mileage: req.body.general.mileage,
        region_id: req.body.general.region_id,
        city_id: req.body.general.city_id,
        VIN: req.body.general.VIN,
      },
      price: {
        value: req.body.price.value,
        currency_id: req.body.price.currency_id,
        auctions: req.body.price.auctions,
        exchangesAutoAllowed: req.body.price.exchangesAutoAllowed
      },
      description: req.body.description,
      additional_characteristics: {
        color_id: req.body.additional_characteristics.color_id,
        metallic: req.body.additional_characteristics.metallic,
        technical_condition_id: req.body.additional_characteristics.technical_condition_id,
        country_import_id: req.body.additional_characteristics.country_import_id,
      },
      contacts: {
        phone: req.body.contacts.phone
      },
      agreement: req.body.agreement,
      status_id: status
    }).save();

    res.status(201).json({ message: 'Success Advertisement create' });
  } catch (e) {
    res.status(500).json({ message: 'Error Advertisement create', error: e });
  }
});

module.exports = router;
