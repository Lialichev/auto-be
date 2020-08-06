module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    req.price = {};

    if (req.body.price) {
        req.price = {
            value: req.body.price.value,
            currency: req.body.price.currency,
            auctions: req.body.price.auctions,
            exchangesAutoAllowed: req.body.price.exchangesAutoAllowed
        };
    }

    next();
};
