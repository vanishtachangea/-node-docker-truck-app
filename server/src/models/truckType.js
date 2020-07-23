const mongoose = require('mongoose');
const validator = require('validator');

//TruckType Model and Schema
//TruckType : TruckType Description
const truckTypeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    description: {
        type: String
    }

}, { timestamps: true })
const TruckType = mongoose.model('TruckType', truckTypeSchema);

module.exports = TruckType;