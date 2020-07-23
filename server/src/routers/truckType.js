const express = require('express');
const router = new express.Router();
const TruckType = require('../models/truckType');

router.post('/trucktypes', async (req, res) => {
    const truck = new TruckType(req.body);
    try {
        await truck.save();
        res.status(201).send(truck);
    }
    catch (e) {
        res.status(400).send(e).json({success: false, error:e.message});
    }
})

router.get('/trucktypes', async (req, res) => {
    try {
        const trucktypes = await TruckType.find({}).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip));
        res.status(201).send(trucktypes);
    }
    catch (e) {
        res.status(500).json({success: false, error:e.message});
    }
})

router.get('/trucktypes/:id', async (req, res) => {
    try {
        const truckType = await TruckType.findById(req.params.id);
        res.status(201).send(truckType);
    }
    catch (e) {
        res.status(500).json({success: false, error:e.message});
    }
})



router.put('/trucktypes/:id', async (req, res) => {
    try {
        const truck = await TruckType.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!truck) {
            return res.status(404).send();
        }
        res.status(201).send(truck);
    }
    catch (e) {
        res.status(500).json({success: false, error:e.message});
    }
})

router.delete('/trucktypes/:id', async (req, res) => {
    try {
        const truck = await TruckType.findByIdAndDelete(req.params.id);
        if (!truck) {
            return res.status(404).send();
        }
        res.status(201).send(truck);
    }
    catch (e) {
        res.status(500).json({success: false, error:e.message});
    }
})

module.exports = router;