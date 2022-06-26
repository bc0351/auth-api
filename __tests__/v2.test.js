'use strict';
require('dotenv').config();
const { db } = require('../src/models');
const base64 = require('base-64');
const supertest = require('supertest');
const { server } = require('../src/server');
const request = supertest(server);

let user,
    token,
    decodedAuthString,
    encodedAuthString;

beforeAll(async () => {
    user  = { username: 'ben', password: 'password', role: 'admin' };
    decodedAuthString = `${user.username}:${user.password}`;
    encodedAuthString = base64.encode(decodedAuthString);
    await db.sync();
});

afterAll(async () => {
    await db.drop();
    await db.close();
});

describe('3. API Version 2 (Protected Routes) Tests', () => {

    test('3.a.) app.get(...) should require authentication only, no specific roles', async () => {
        let response = await request
            .get('api/v2/food')
            .set('Authentication', `Basic ${encodedAuthString}`);

        expect(response.status).toEqual(201);
    });

  
})
