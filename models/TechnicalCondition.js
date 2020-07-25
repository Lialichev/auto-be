const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    versionKey: false
  }
);

module.exports = model('TechnicalCondition', schema);
