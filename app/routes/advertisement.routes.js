const { Router } = require('express');
const router = Router();
const advertisement = require("../controllers/advertisement.controller");

// POST create /api/advertisement
router.post('/', advertisement.create);

module.exports = router;
