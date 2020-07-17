const { Schema, model, Types } = require('mongoose');

const schema = new Schema(
    {
        name: { type: String, required: true },
        category_id: { type: Types.ObjectId, required: true, ref: 'Category' }
    },
    {
        versionKey: false
    }
);

module.exports = model('Brand', schema);
