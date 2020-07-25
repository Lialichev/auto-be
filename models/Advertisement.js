const { Schema, model, Types } = require('mongoose');

const schema = new Schema(
  {
    photos: [ { type: String } ],
    general: {
      category_id: { type: Types.ObjectId, required: true, ref: 'Category' },
      brand_id: { type: Types.ObjectId, required: true, ref: 'Brand' },
      model_id: { type: Types.ObjectId, required: true, ref: 'Model' },
      year: { type: Number, required: true, minlength: 4, maxlength: 4 },
      modification: { type: String },
      body_type_id: { type: Types.ObjectId, required: true, ref: 'BodyType' },
      mileage: { type: Number, required: true, min: 1, max: 99999 },
      region_id: { type: Types.ObjectId, required: true, ref: 'Region' },
      city_id: { type: Types.ObjectId, required: true, ref: 'City' },
      VIN: { type: String },
    },
    price: {
      value: { type: Number, required: true },
      currency_id: { type: Types.ObjectId, required: true, ref: 'Currency' },
      auctions: { type: Boolean, default: false },
      exchangesAutoAllowed: { type: Boolean, default: false }
    },
    description: { type: String, maxlength: 2000 },
    additional_characteristics: {
      color_id: { type: Types.ObjectId, ref: 'Color' },
      metallic: { type: Boolean, default: false },
      technical_condition_id: { type: Types.ObjectId, ref: 'TechnicalCondition' },
      country_import_id: { type: Types.ObjectId, ref: 'Country' },
    },
    contacts: {
      phone: { type: String, required: true }
    },
    agreement: { type: Boolean, required: true },
    published_date: { type: Date, required: true, default: new Date() },
    updated_date: { type: Date, required: true, default: new Date() },
    owner_id: { type: Types.ObjectId, ref: 'User' },
    status_id: { type: Types.ObjectId, required: true, ref: 'Status' }
  },
  {
    versionKey: false
  }
);

module.exports = model('Advertisement', schema);
