const mongoose = require('mongoose');
const config = require('config');
const PowerType = require('../../models/PowerType');
const initData = require('./init.json');

async function start() {

  try {

    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    await PowerType.deleteMany();

    await PowerType.create(initData.map((name) => ({ name })));

    console.log('Init PowerType success');
    process.exit();

  } catch (e) {

    console.log('Init PowerType Error', e.message);
    process.exit();

  }

}

start();
