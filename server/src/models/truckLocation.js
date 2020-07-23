const mongoose = require('mongoose');
const validator = require('validator');
const truck = require('./truck');

// Get the Schema constructor
var Schema = mongoose.Schema;
var truckLocationSchema = new mongoose.Schema(
    {
        truck: {
            type: Schema.Types.ObjectId,
            ref: 'Truck',
            required: true
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        },
        geometry: { type: { type: String, default: 'Point' }, coordinates: [Number] }
    }, { timestamps: true }
);

const TruckLocation = mongoose.model('TruckLocation', truckLocationSchema)

module.exports = TruckLocation;