const mongoose = require('mongoose');
const config = require('config');
const Currency = require('../../models/Currency');
const initData = require('./init.json');

async function start() {

  try {

    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    await Currency.deleteMany();

    await Currency.create(initData);

    console.log('Init Currency success');
    process.exit();

  } catch (e) {

    console.log('Init Currency Error', e.message);
    process.exit();

  }

}

start();
