
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../src/models/user');
const userOneId = new mongoose.Types.ObjectId();


const userOne = {
    _id: userOneId,
    "firstName":"Jack2",
    "lastName":"Leventreur2",
    "email":"jack.leventreur2@gmail.com",
    "password":"pwd1",
    "tokens":[
        {
            token:jwt.sign({_id:userOneId}, process.env.JWT_SECRET)
        }
    ]
}
const setupDatabase = async()=>{
    await User.deleteMany()
    await new User(userOne).save();

}
module.exports={setupDatabase, userOne,userOneId};