const mongoose = require('mongoose');
const config = require('config');
const PowerType = require('../../models/PowerType');
const initData = require('./init.json');

const start = async () => {

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

  } catch (e) {

    console.log('Init PowerType Error', e.message);
    process.exit();

  }

}

module.exports = start;
