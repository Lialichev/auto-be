const mongoose = require('mongoose');
const config = require('config');
const Region = require('../../models/Region');
const initData = require('./init.json');

async function start() {

  try {

    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    await Region.deleteMany();

    await Region.create(initData);

    console.log('Init Region success');
    process.exit();

  } catch (e) {

    console.log('Init Region Error', e.message);
    process.exit();

  }

}

start();
