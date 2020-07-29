const mongoose = require('mongoose');
const config = require('config');
const Gearbox = require('../../models/Gearbox');
const initData = require('./init.json');

async function start() {

  try {

    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    await Gearbox.deleteMany();

    await Gearbox.create(initData.map((name) => ({ name })));

    console.log('Init Gearbox success');
    process.exit();

  } catch (e) {

    console.log('Init Gearbox Error', e.message);
    process.exit();

  }

}

start();
