const request = require('supertest');

const server = require('../api/server');

const db = require('../database/dbConfig.js');

describe('register', function() {
  beforeEach(async () => {
    await db('users').truncate();
  });

  it('should register', function() {
    return request(server)
      .post('/api/auth/register')
      .send({ username: 'snow white', password: 'pass' })
      .then(res => {
        expect(res.body.username).toEqual('snow white');
        expect(res.body.password).toBeTruthy();
      });
  });

  it('should return 201', function() {
    return request(server)
      .post('/api/auth/register')
      .send({ username: 'snow white', password: 'pass' })
      .then(res => {
        expect(res.status).toBe(201);
      });
  });
});

describe('login', function() {
  it('should return status 200', function() {
    return request(server)
      .post('/api/auth/login')
      .send({ username: 'snow white', password: 'pass' })
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

  it('should return status 401', function() {
    return request(server)
      .post('/api/auth/login')
      .send({ username: 'Notsnowwhite', password: 'Notpass' })
      .then(res => {
        expect(res.status).toBe(401);
      });
  });
});
