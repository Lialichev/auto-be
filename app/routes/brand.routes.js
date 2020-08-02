const { Router } = require('express');
const brand = require('../controllers/brand.controller')
const router = Router();

// POST create /api/brand
router.post('/', brand.create);

// GET ALl /api/brand
router.get('/', brand.findAll);

// GET by category_id /api/brand/category/:id
router.get('/category/:id', brand.findByCategory);

// GET by ID /api/brand/:id
router.get('/:id', brand.findOne);

// PUT Update by ID /api/brand/:id
router.put('/:id', brand.update);

module.exports = router;
