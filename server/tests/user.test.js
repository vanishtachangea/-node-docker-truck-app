const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const {setupDatabase, userOne,userOneId} =require('./db')

beforeEach(setupDatabase);
/* beforeEach(async ()=>{
    await User.deleteMany()
    await new User(userOne).save();
    //console.log("before each");
}) */

test('Should sign up a new user',async ()=>{
    const response =await request(app).post('/users').send({
        "firstName":"Jack",
        "lastName":"Leventreur",
        "email":"jack.leventreur@gmail.com",
        "password":"pwd1"
    }).expect(201);

    //assert that the database was change correctly. 
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    //Assert about the response
    //expect(response.body.user.firstName).toBe('Jack');
    expect(response.body).toMatchObject({
        user:{
            "firstName":"Jack",
            "lastName":"Leventreur",
            "email":"jack.leventreur@gmail.com",
        },
        token: user.tokens[0].token
    })

})

test('Should login existing user', async()=>{
    await request(app).post('/users/login').send(
        {
            "email":userOne.email,
            "password":userOne.password        
        }
).expect(201);
})

test('Should not login invalid user', async()=>{
    await request(app).post('/users/login').send(
        {
            "email":userOne.email+"sdfd",
            "password":userOne.password        
        }
).expect(500);
})

//Authentication 
test('Should get Profile for user', async ()=>{
    await request(app)
    .get('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(201);
})


test('Should get Profile for unauthorised user', async ()=>{
    await request(app)
    .get('/users/me')
    .send()
    .expect(401);
})
