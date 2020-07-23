const express = require('express');
const router = new express.Router();
const TruckLocation = require('../models/truckLocation');


router.post('/truckLocations', async (req, res) => {
    const truckLocation = new TruckLocation(req.body);
    try {
        await truckLocation.save();
        res.status(200).send(truckLocation);
    }

    catch (e) {
        res.status(400).send(e).json({success: false, error:e.message});
    }
})

router.get('/truckLocations', async (req, res) => {
    try {
        const truckLocations = await TruckLocation.find({}).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip));
        res.status(201).send(truckLocations);
    }
    catch (e) {
        res.status(500).json({success: false, error:e.message});
    }
})
/*
router.get('/trucks/:id',async (req, res)=>{
    try{
        const trucks = await Truck.findById(req.params.id);
        res.status(201).send(trucks);
    }
    catch(e)
    {
        res.status(500).send();
    }
})



router.put('/trucks/:id',async (req, res)=>{
    try{
        const truck = await Truck.findByIdAndUpdate(req.params.id, req.body, {new:true,runValidators:true});
        if(!truck)
        {
            return res.status(404).send();
        }
        res.status(201).send(truck);
    }
    catch(e)
    {
        res.status(500).send();
    }
})

router.delete('/trucks/:id',async (req, res)=>{
    try{
        const truck = await Truck.findByIdAndDelete(req.params.id);
        if(!truck)
        {
            return res.status(404).send();
        }
        res.status(201).send(truck);
    }
    catch(e)
    {
        res.status(500).send();
    }
})
*/
module.exports = router;