const { Schema, model, Types } = require('mongoose');

const schema = new Schema(
  {
    name: { type: String, required: true },
    brand_id: { type: Types.ObjectId, required: true, ref: 'Brand' }
  },
  {
    versionKey: false
  }
);

module.exports = model('Model', schema);
