const mongoose = require('mongoose');
const config = require('config');
const Fuel = require('../../models/Fuel');
const initData = require('./init.json');

async function start() {

  try {

    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    await Fuel.deleteMany();

    await Fuel.create(initData.map((name) => ({ name })));

    console.log('Init Fuel success');
    process.exit();

  } catch (e) {

    console.log('Init Fuel Error', e.message);
    process.exit();

  }

}

start();
