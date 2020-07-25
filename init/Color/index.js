const mongoose = require('mongoose');
const config = require('config');
const Color = require('../../models/Color');
const initData = require('./init.json');

async function start() {

  try {

    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    await Color.deleteMany();

    await Color.create(initData);

    console.log('Init Color success');
    process.exit();

  } catch (e) {

    console.log('Init Color Error', e.message);
    process.exit();

  }

}

start();
