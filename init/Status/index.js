const mongoose = require('mongoose');
const config = require('config');
const Status = require('../../models/Status');
const initData = require('./init.json');

async function start() {

  try {

    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    await Status.deleteMany();

    await Status.create(initData.map((name) => ({ name })));

    console.log('Init Status success');
    process.exit();

  } catch (e) {

    console.log('Init Status Error', e.message);
    process.exit();

  }

}

start();
