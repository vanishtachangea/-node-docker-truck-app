const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

//sign up
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();

        const token = await user.generateAuthToken();
        res.status(201).send({user,token});
        
    }
    catch (e) {
        res.status(500).send(e).json({success: false, error:e.message});
    }

})

//User profile
router.get('/users/me',auth, async (req, res) => {
    try {
        res.status(201).send({user:req.user});
    }
    catch (e) {
        res.status(500).json({success: false, error:e.message});
    }
})

router.patch('/users/me',auth, async (req, res) => {
    const reqUpdateFields = Object.keys(req.body);
    const allowedUpdateFields = ['firstName', 'lastName', 'email', 'password', 'company'];
    const isValidOperation = reqUpdateFields.every((update) => {
        return allowedUpdateFields.includes(update)
    })
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Update' })
    }
    try {

        reqUpdateFields.forEach(update => {
            req.user[update] = req.body[update];
        });


        await req.user.save();
        res.send({user:req.user});
    }
    catch (e) {
        return res.status(400).send(e).json({success: false, error:e.message});
    }
})

//sign in
router.post('/users/login', async (req, res) => {
    try {
 
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(201).send({user,token});
    }
    catch (e) {
        return res.status(500).json({success: false, error:e.message});   
    }
})

//logout
router.post('/users/logout', auth, async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !==req.token
        })
        await req.user.save();
        res.status(200).json({success: true}); 
    }
    catch(e){
        res.status(500).json({success: false, error:e.message}); 
    }
})


//logout All
router.post('/users/logoutAll', auth, async(req,res)=>{
    try{
        req.user.tokens = [];
        await req.user.save();
        res.status(200).json({success: true}); 
    }
    catch(e){
        res.status(500).json({success: false, error:e.message}); 
    }
})

router.delete('/users/me', auth,async (req, res) => {
    try {
       // const user = await User.findByIdAndDelete(req.user._id);
        await req.user.remove();//user
        res.send(req.user);
    }
    catch (e) {
        res.status(400).json({success: false, error:e.message});
    }
})
module.exports = router; 