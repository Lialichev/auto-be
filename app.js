const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/category', require('./routes/category.routes'));
app.use('/api/brand', require('./routes/brand.routes'));

const PORT = config.get('port') || 5000;

async function start() {

  try {

    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log(`DB has been connected - ${config.get('mongoUri')}`);

    app.listen(PORT, () => console.log(`App has been started ${PORT}`));

  } catch (e) {

    console.log('Server Error', e.message);

    process.exit(1);

  }

}

start();
