const { Schema, model, Types } = require('mongoose');

const schema = new Schema(
  {
    category_id: { type: Types.ObjectId, required: true, ref: 'Category' },
    brand_id: { type: Types.ObjectId, required: true, ref: 'Brand' },
    model_id: { type: Types.ObjectId, required: true, ref: 'Model' },
    region_id: { type: Types.ObjectId, required: true, ref: 'Region' },
    year: { type: Number, required: true, min: 4, max: 4 },
    price: { type: Number, required: true },
  },
  {
    versionKey: false
  }
);

module.exports = model('Advertisement', schema);
