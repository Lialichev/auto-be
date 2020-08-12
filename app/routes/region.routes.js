const { Router } = require('express');
const region = require('../controllers/region.controller');
const router = Router();

// GET ALl /api/model
router.get('/', region.findAll);

module.exports = router;
