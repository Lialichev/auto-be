const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb', extended: true }));

app.use('/api/auth', require('./app/routes/auth.routes'));
app.use('/api/category', require('./app/routes/category.routes'));
app.use('/api/brand', require('./app/routes/brand.routes'));
app.use('/api/model', require('./app/routes/model.routes'));
app.use('/api/advertisement', require('./app/routes/advertisement.routes'));

const PORT = config.get('port') || 5000;

async function start() {

  try {

    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log(`DB has been connected - ${ config.get('mongoUri') }`);

    app.listen(PORT, () => console.log(`App has been started ${ PORT }`));

  } catch (e) {

    console.log('Server Error', e.message);

    process.exit(1);

  }

}

start();
