const { Router } = require('express');
const router = Router();
const advertisement = require("../controllers/advertisement.controller");
const filter = require("../middleware/filter.middleware");
const autoInfo = require("../middleware/autoInfo.middleware");
const general = require("../middleware/adv.general.middleware");
const price = require("../middleware/adv.price.middleware");
const contacts = require("../middleware/adv.contacts.middleware");
const adchar = require("../middleware/adv.adchar.middleware");

// POST create /api/advertisement
router.post(
    '/',
    autoInfo,
    general,
    price,
    contacts,
    adchar,
    advertisement.create
);

// GET Get All /api/advertisement
router.get('/', filter, advertisement.findAll);

// GET Get one /api/advertisement/:id
router.get('/:id', advertisement.findOne);

module.exports = router;
