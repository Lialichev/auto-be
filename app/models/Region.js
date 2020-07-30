const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    code: {
      old: { type: String, required: true },
      new: { type: String, required: true },
    }
  },
  {
    versionKey: false
  }
);

module.exports = model('Region', schema);
