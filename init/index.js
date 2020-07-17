const mongoose = require('mongoose');
const config = require('config');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const initData = require('./init.json');
const find = require('lodash/find');
const get = require('lodash/get');
const map = require('lodash/map');

async function start() {

    try {

        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        await Category.deleteMany();

        const initCategories = initData.map(({ cat_name: name }) => ({ name }));

        const categories = await Category.create(initCategories);

        await Brand.deleteMany();

        let initBrands = [];

        categories.map((item) => {
            map(get(find(initData, { cat_name: item.name }), 'brands'), ({ brand_name }) => {
                initBrands.push({
                    name: brand_name,
                    category_id: item._id
                });
            });
        });

        const brands = await Brand.create(initBrands);

        console.log('Init success');
        process.exit();

    } catch (e) {

        console.log('Init Brand Error', e.message);
        process.exit();

    }

}

start();
