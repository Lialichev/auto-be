const mongoose = require('mongoose');
const config = require('config');
const Country = require('../../models/Country');
const initData = require('./init.json');

async function start() {

  try {

    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    await Country.deleteMany();

    await Country.create(initData.map((name) => ({ name })));

    console.log('Init Country success');
    process.exit();

  } catch (e) {

    console.log('Init Country Error', e.message);
    process.exit();

  }

}

start();
