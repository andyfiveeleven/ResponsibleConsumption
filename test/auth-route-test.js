'use strict';

const expect = require('chai').expect;
const request = require('superagent');

const User = require('../model/user.js');

const url = `http://localhost:${process.env.PORT}`;
require('../server.js');

const exampleUser = {
  username: 'exampleuser',
  password: '1234',
  email: 'exampleuser@test.com'
};

describe('Auth Routes', () => {
  describe('invalid paths', () => {
    describe('POST: with invalid route', () => {
      it('should return an error status of 404', (done) => {
        request.post(`${url}/api/signup/not/a/path`)
        .send(exampleUser)
        .end((err, res) => {
          console.log(err.message);
          expect(err.status).to.equal(404);
          done();
        });
      });
    });

    describe('GET: with invalid route', () => {
      it('should return an error status 404', (done) => {
        request.get(`${url}/api/signin/not/a/path`)
        .auth(exampleUser.username, exampleUser.password)
        .end((err, res) => {
          console.log(res.text);
          expect(err.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('POST: /api/signup', () => {
    afterEach((done) => {
      User.remove({})
        .then(() => done())
        .catch(done);
    });
    describe('with valid body', () => {
      it('should return a status of 200 and a token', (done) => {
        request.post(`${url}/api/signup`)
        .send(exampleUser)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.text).to.be.a('string');
          console.log(res);
          done();
        });
      });
    });

    describe('with invalid body', () => {
      it('should return an error status of 400', (done) => {
        request.post(`${url}/api/signup`)
        .send()
        .end((err, res) => {
          console.log(res.text);
          expect(err.status).to.equal(400);
          done();
        });
      });
    });
  });


  describe('GET: /api/signin', () => {
    afterEach((done) => {
      User.remove({})
        .then(() => done())
        .catch(done);
    });
    beforeEach((done) => {
      let user = new User(exampleUser);
      user.generatePasswordHash(exampleUser.password)
      .then((user) => user.save())
      .then((user) => {
        this.tempUser = user;
        done();
      })
      .catch(done);
    });
    describe('with valid body', function() {
      it('should return a status of 200 and a token', (done) => {
        request.get(`${url}/api/signin`)
        .auth(exampleUser.username, exampleUser.password)
        .end((err, res) => {
          if(err) return done(err);
          console.log(res.body);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });

    describe('cannot be authenticated', function() {
      it('should return status: 401, msg: username required', (done) => {
        request.get(`${url}/api/signin`)
        .auth('', exampleUser.password)
        .end((err, res) => {
          expect(err.status).to.equal(401);
          expect(res.text).to.equal('username required');
          done();
        });
      });
      it('should return status: 401, msg: password required', (done) => {
        request.get(`${url}/api/signin`)
        .auth(exampleUser.username, '')
        .end((err, res) => {
          expect(err.status).to.equal(401);
          expect(res.text).to.equal('password required');
          done();
        });
      });
      it('should return status: 401, msg: unauthorized', (done) => {
        request.get(`${url}/api/signin`)
        .auth(exampleUser.username, 'bad password')
        .end((err, res) => {
          expect(err.status).to.equal(401);
          expect(res.text).to.equal('unauthorized');
          done();
        });
      });
      it('should return status: 401, msg: invalid username', (done) => {
        request.get(`${url}/api/signin`)
        .auth('bad username', exampleUser.password)
        .end((err, res) => {
          expect(err.status).to.equal(401);
          expect(res.text).to.equal('invalid username');
          done();
        });
      });
    });
  });
});
