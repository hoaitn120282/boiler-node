const request = require('supertest');
const getClientEnvironment = require('./../scripts/env');
getClientEnvironment('');
const app = require('../build/app');

describe('GET /', () => {
    it('should return 404 OK', done => {
        request(app)
            .get('/api/v1')
            .expect(404, done());
    });
});

describe('GET /user/account', () => {
    it('should return 200 OK', done => {
        request(app)
            .get('/user/account')
            .expect(200, done());
    });
});

describe('GET /home', () => {
    it('should return 200 OK', done => {
        request(app)
            .get('/home')
            .expect(200, done());
    });
});

describe('GET /random-url', () => {
    it('should return 404', done => {
        request(app)
            .get('/reset')
            .expect(404, done());
    });
});
