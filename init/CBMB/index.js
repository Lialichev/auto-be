const mongoose = require('mongoose');
const config = require('config');
const Category = require('../../models/Category');
const Brand = require('../../models/Brand');
const Model = require('../../models/Model');
const BodyType = require('../../models/BodyType');
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
    await BodyType.deleteMany();

    for (const { cat_name, brands, body_type } of initData) {
      const category = await new Category({ name: cat_name }).save();

      if (brands.length) {
        for (const { brand_name, models } of brands) {
          const brand = await new Brand({ name: brand_name, category_id: category._id }).save();

          for (const name of models) {
            await new Model({ name, brand_id: brand._id }).save();
          }
        }
      }

      await BodyType.create(body_type.map(({ name }) => ({ name, category_id: category._id })));
    }

    console.log('Init CBMB success');
    process.exit();

  } catch (e) {

    console.log('Init CBMB Error', e.message);
    process.exit();

  }

}

start();
