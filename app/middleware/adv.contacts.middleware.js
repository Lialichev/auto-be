module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    req.contacts = {};

    if (req.body.contacts) {
        req.ontacts = {
            phone: req.body.contacts.phone
        };
    }

    next();
};
