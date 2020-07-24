const mongoose = require('mongoose');
const config = require('config');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Model = require('../models/Model');
const initData = require('./init.json');

async function start() {

  try {

    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    await Category.deleteMany();
    await Brand.deleteMany();
    await Model.deleteMany();

    for (const { cat_name, brands } of initData) {
      const category = await new Category({ name: cat_name }).save();

      for (const { brand_name, models } of brands) {
        const brand = await new Brand({ name: brand_name, category_id: category._id }).save();

        for (const name of models) {
          await new Model({ name, brand_id: brand._id }).save();
        }
      }
    }

    console.log('Init success');
    process.exit();

  } catch (e) {

    console.log('Init Error', e.message);
    process.exit();

  }

}

start();
