const mongoose = require('mongoose');
const config = require('config');
const Drive = require('../../models/Drive');
const initData = require('./init.json');

const start = async () => {

  try {

    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    await Drive.deleteMany();

    await Drive.create(initData.map((name) => ({ name })));

    console.log('Init Drive success');

  } catch (e) {

    console.log('Init Drive Error', e.message);
    process.exit();

  }

}

module.exports = start;
