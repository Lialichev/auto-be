const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  followers: [{ type: Types.ObjectId, ref: 'User' }],
  creator: { type: Types.ObjectId, ref: 'User' },
});

module.exports = model('Book', schema);