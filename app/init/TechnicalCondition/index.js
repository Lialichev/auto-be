const mongoose = require('mongoose');
const config = require('config');
const TechnicalCondition = require('../../models/TechnicalCondition');
const initData = require('./init.json');

const start = async () => {

  try {

    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    await TechnicalCondition.deleteMany();

    await TechnicalCondition.create(initData);

    console.log('Init Technical Condition success');

  } catch (e) {

    console.log('Init Technical Condition Error', e.message);
    process.exit();

  }

}

module.exports = start;
