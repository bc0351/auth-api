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

describe('1. Authentication and Authorization Tests', () => {

    test('1.a.) POST /signup to create a user', async () => {
        let response = await request
            .post('/signup')
            .send(user);

        expect(response.status).toEqual(201);
    });

    test('1.b.) POST /signin to login a user and receive a token', async () => {
        decodedAuthString = `${user.username}:${user.password}`;
        encodedAuthString = base64.encode(decodedAuthString);
        let response = await request
            .post('/signin')
            .set('Authorization',`Basic ${encodedAuthString}`);

        expect(response.status).toEqual(200);
        expect(response.body.user.token).toBeTruthy();
            
        token = response.body.user.token;
    });

    test('1.c.) GET /secret should receive a valid bearer token', async () => {
        let response = await request
            .get('/secret')
            .set('Authorization',`Bearer ${token}`);

        expect(response.status).toEqual(200);
    });

    test('1.d.) GET /users should require a valid token and "delete" permissions', async () => {
        let response = await request
            .get('/users')
            .set('Authorization',`Bearer ${token}`);
        expect(response.status).toEqual(200);
    });
})
