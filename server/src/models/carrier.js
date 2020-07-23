const mongoose = require('mongoose');
const validator = require('validator');

//Carrier Model and Schema
//Carrier : CarrierId CarrierName CarrierAddress
const carrierSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Address: {
        type: String
    }
}, { timestamps: true })
const Carrier = mongoose.model('Carrier', carrierSchema)

module.exports = Carrier;