const { Schema, model, Types } = require('mongoose');

const schema = new Schema(
    {
        photos: [ { type: String } ],
        general: {
            category: { type: Types.ObjectId, required: true, ref: 'Category' },
            brand: { type: Types.ObjectId, required: true, ref: 'Brand' },
            model: { type: Types.ObjectId, required: true, ref: 'Model' },
            year: { type: Number, required: true, minlength: 4, maxlength: 4 },
            modification: { type: String },
            body_type: { type: Types.ObjectId, required: true, ref: 'BodyType' },
            mileage: { type: Number, required: true, min: 1, max: 99999 },
            region: { type: Types.ObjectId, required: true, ref: 'Region' },
            city: { type: Types.ObjectId, required: true, ref: 'City' },
            VIN: { type: String },
        },
        price: {
            value: { type: Number, required: true },
            currency: { type: Types.ObjectId, required: true, ref: 'Currency' },
            auctions: { type: Boolean, default: false },
            exchangesAutoAllowed: { type: Boolean, default: false }
        },
        description: { type: String, maxlength: 2000 },
        additional_characteristics: {
            gearbox: { type: Types.ObjectId, ref: 'Gearbox' },
            fuel: {
                type: { type: Types.ObjectId, ref: 'Fuel' },
                city: { type: Number },
                route: { type: Number },
                combine: { type: Number },
            },
            engine_volume_liters: { type: Types.ObjectId, ref: 'EngineVolumeLiters' },
            power: {
                type: { type: Types.ObjectId, ref: 'PowerType' },
                value: { type: Number },
            },
            drive: { type: Types.ObjectId, ref: 'Drive' },
            doors: { type: Number },
            seats: { type: Number },
            color: { type: Types.ObjectId, ref: 'Color' },
            metallic: { type: Boolean, default: false },
            technical_condition: { type: Types.ObjectId, ref: 'TechnicalCondition' },
            country_import: { type: Types.ObjectId, ref: 'Country' },
        },
        contacts: {
            phone: { type: String, required: true }
        },
        agreement: { type: Boolean, required: true },
        published_date: { type: Date },
        created_date: { type: Date, required: true, default: Date.now },
        updated_date: { type: Date, required: true, default: Date.now },
        owner: { type: Types.ObjectId, ref: 'User' },
        status: { type: Types.ObjectId, required: true, ref: 'Status' },
        digits: { type: String, unique: true },
        num_info: {
            stolen: { type: Boolean },
            year: { type: Number },
            last_operation: { type: String },
            brand: { type: String },
            model: { type: String },
        }
    },
    {
        versionKey: false
    }
);

module.exports = model('Advertisement', schema);
