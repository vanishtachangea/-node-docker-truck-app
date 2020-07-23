const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const {setupDatabase, userOne,userOneId} =require('./db')

beforeEach(setupDatabase);

test('Should to be able to create a truck', ()=>{
    
})