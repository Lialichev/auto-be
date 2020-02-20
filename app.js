const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/book', require('./routes/book.routes'));

const PORT = config.get('port') || 5000;

async function start() {

  try {

    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(`DB has been connected - ${config.get('mongoUri')}`);

    app.listen(PORT, () => console.log(`App has been started ${PORT}`));

  } catch (e) {

    console.log('Server Error', e.message);

    process.exit(1);

  }

}

start();