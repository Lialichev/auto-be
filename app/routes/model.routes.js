const { Router } = require('express');
const model = require('../controllers/model.controller');
const router = Router();

// POST create /api/model
router.post('/', model.create);

// GET ALl /api/model
router.get('/', model.findAll);

// GET by brand_id /api/model/brand/:id
router.get('/brand/:id', model.findByBrand);

// GET by ID /api/model/:id
router.get('/:id', model.findOne);

// PUT Update by ID /api/model/:id
router.put('/:id', model.update);

module.exports = router;
