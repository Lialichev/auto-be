const { Router } = require('express');
const router = Router();
const category = require("../controllers/category.controller");

// POST create /api/category
router.post('/', category.create);

// GET All /api/category
router.get('/', category.findAll);

// GET by ID /api/category/:id
router.get('/:id', category.findOne);

// PUT Update by ID /api/category/:id
router.put('/:id', category.update);

module.exports = router;
