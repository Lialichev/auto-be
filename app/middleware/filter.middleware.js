const range = require('../helpers/range.helper');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  req.filter = {};

  // Main Filter
  if (req.query.category) {
    req.filter['general.category'] = req.query.category;
  }

  if (req.query.brand) {
    req.filter['general.brand'] = req.query.brand;
  }

  if (req.query.model) {
    req.filter['general.model'] = req.query.model;
  }

  if (req.query.region) {
    req.filter['general.region'] = {
      $in: req.query.region
    };
  }

  if (req.query.from_year || req.query.to_year) {
    req.filter['general.year'] = range(req.query.from_year, req.query.to_year);
  }

  if (req.query.min_price || req.query.max_price) {
    req.filter['price.value'] = range(req.query.min_price, req.query.max_price);
  }

  // Advance
  if (req.query.body_type) {
    req.filter['general.body_type'] = {
      $in: req.query.body_type
    };
  }

  if (req.query.auctions === 'true') {
    req.filter['price.auctions'] = true;
  }

  if (req.query.exchangesAutoAllowed === 'true') {
    req.filter['price.exchangesAutoAllowed'] = true;
  }

  if (req.query.only_photo === 'true') {
    req.filter['photos'] = { $exists: true, $ne: [] };
  }

  next();
};
