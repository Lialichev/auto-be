const mongoose = require('mongoose');
const config = require('config');
const City = require('../../models/City');
const initData = require('./init.json');

const start = async () => {

    try {

        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        await City.deleteMany();

        await City.create(initData.map((name) => ({ name })));

        console.log('Init City success');

    } catch (e) {

        console.log('Init City Error', e.message);
        process.exit();

    }

}

module.exports = start;
