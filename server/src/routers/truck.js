const express = require('express');
const router = new express.Router();
const Truck = require('../models/truck');
const TruckType = require('../models/truckType');
const auth = require('../middleware/auth');


router.post('/trucks', auth, async (req, res) => {
    try {
        await Truck.insertMany(req.body, (error, trucks) => {
            if (error) {
                res.status(400).send(error).json({success: false, error:e.message});
            }
            res.status(200).send(trucks);
        })
    }
    catch (e) {
        res.status(400).send(e).json({success: false, error:e.message});
    }
})


//Get All
//Get /trucks?limit=10&skip=20
//Get /trucks?sortBy=createdAt:desc
router.get('/trucks', auth, async (req, res) => {
    const match = {}
    const sort ={}
    if(req.params)
    {

    }
    if(req.query.sortBy)
    {
        const queryParts = req.query.sortBy.split(":");
        sort[queryParts[0]]=queryParts[1]==='desc'?-1:1;
    }
    try {
        await Truck.find({})
            .limit(parseInt(req.query.limit))
            .skip(parseInt(req.query.skip))
            .sort(sort)
            .populate({
                path: 'truckType', options: {
                    limit: parseInt(req.query.limit)
                }
            }).populate()
            .exec((error, trucks) => {
                if (error) {
                    res.status(400).send(error);
                }
                res.status(200).send(trucks);
            })
    } 
    catch (e) {
        res.status(500).send(e).json({success: false, error:e.message});
    }
})

//Get by TruckTypeId
router.get('/trucks/trucktype/:id', auth, async (req, res, body) => {
    try {
        await Truck.find({ truckType: req.params.id }).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip))
            .populate('truckType'

            )
            .exec((error, trucks) => {
                if (error) {
                    res.status(400).send(error).json({success: false, error:e.message});
                }
                res.status(200).send(trucks);
            })
    }
    catch (e) {
        res.status(500).send(e).json({success: false, error:e.message});
    }
})
//Get by TruckId
router.get('/trucks/:id', async (req, res) => {
    try {
        const trucks = await Truck.findById(req.params.id);
        res.status(201).send(trucks);
    }
    catch (e) {
        res.status(500).json({success: false, error:e.message});
    }
})

router.put('/trucks/:id', async (req, res) => {
    try {
        const truck = await Truck.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!truck) {
            return res.status(404).send();
        }
        res.status(201).send(truck);
    }
    catch (e) {
        res.status(500).json({success: false, error:e.message});
    }
})

router.delete('/trucks/:id', async (req, res) => {
    try {
        const truck = await Truck.findByIdAndDelete(req.params.id);
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