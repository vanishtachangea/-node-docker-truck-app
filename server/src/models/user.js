const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');

//User schema
const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        unique:true,
        type: String,
        required:true,
 
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email invalid");
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    Company: {
        type: String
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

}, { timestamps: true })

userSchema.methods.toJSON =  function (){
    const user = this; //don't use arrow function if you are using this.
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject; 
}

//static method available on the schemas
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token =jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

//find user by checking password with encrypted password
userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email})
    if(!user)
    {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error ('Unable to login')
    }
    return user;
}

//Hash Password before saving
userSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8);
    }
    next();// to indicate that we are done with the instructions so that save can then be executed
})



const User = mongoose.model('User', userSchema);

module.exports = User;