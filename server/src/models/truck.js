const mongoose = require('mongoose');
const validator = require('validator');
const truckType = require('./truckType');

// Get the Schema constructor
var Schema = mongoose.Schema;
var truckSchema = new mongoose.Schema(
    {
        plateNumber: {
            type: String,
            required: true
        },
        brand: {
            type: String
        },
        model: {
            type: String
        },
        vehicelHeight: {
            type: mongoose.Decimal128
        },
        vehicleLength: {
            type: mongoose.Decimal128
        },
        vehicleWidth: {
            type: mongoose.Decimal128
        },
        Capacity: {
            type: mongoose.Decimal128
        },
        truckType: {
            type: Schema.Types.ObjectId,
            ref: 'TruckType'
        }
    }
    , { timestamps: true }
)


//Truck Model and Schema
//Truck : TruckId ,TruckTypeId, CarrierId, Brand, Model, PlateNumber, VehicleSize, Capacity

const Truck = mongoose.model('Truck', truckSchema)

module.exports = Truck;