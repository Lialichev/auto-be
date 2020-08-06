const get = require('lodash/get');
const find = require('lodash/find');
const axios = require('axios');

module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        req.num_info = {};

        if (req.body.digits) {
            const autoInfo = await axios(encodeURI(`https://baza-gai.com.ua/nomer/${ req.body.digits }`), {
                headers: {
                    "Accept": "application/json"
                }
            });

            const data = autoInfo.data;

            if (data) {
                req.num_info = {
                    stolen: data.stolen,
                    year: Number(data.year),
                    last_operation: get(find(data.operations, { 'isLast': true }), 'regAt'),
                    brand: data.vendor,
                    model: data.model,
                };
            }
        }

        next();
    } catch (e) {
        next();
    }
};
