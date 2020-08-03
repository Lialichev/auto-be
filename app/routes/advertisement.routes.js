const { Router } = require('express');
const router = Router();
const advertisement = require("../controllers/advertisement.controller");

// POST create /api/advertisement
router.post('/', advertisement.create);

// GET Get All /api/advertisement
router.get('/', advertisement.findAll);

// GET Get one /api/advertisement/:id
router.get('/:id', advertisement.findOne);

module.exports = router;
