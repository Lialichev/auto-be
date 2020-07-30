const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: { type: String, unique: true, required: true },
  },
  {
    versionKey: false
  }
);

module.exports = model('Drive', schema);
