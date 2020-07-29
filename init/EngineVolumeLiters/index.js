const mongoose = require('mongoose');
const config = require('config');
const EngineVolumeLiters = require('../../models/EngineVolumeLiters');
const initData = require('./init.json');

async function start() {

  try {

    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    await EngineVolumeLiters.deleteMany();

    await EngineVolumeLiters.create(initData.map((name) => ({ name })));

    console.log('Init EngineVolumeLiters success');
    process.exit();

  } catch (e) {

    console.log('Init EngineVolumeLiters Error', e.message);
    process.exit();

  }

}

start();
