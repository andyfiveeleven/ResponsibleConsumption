'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
// const Promise = require('bluebird');
const User = require('../model/user.js');

require('../server.js');

const url = `http://localhost:${process.env.PORT}`;

const exampleUser = {
  username: 'exampleuser',
  password: '1234',
  weight: 2,
  lastMeal: 5,
  experience: 3,
  email: 'exampleuser@test.com'
};

describe('Auth Routes', function() {
  afterEach(done => {
    User.remove({})
      .then(() => done())
      .catch(done);
  });
  describe('POST: /api/signup', function() {
    describe('with a valid body', function() {
      it('should return a token', done => {
        request.post(`${url}/api/signup`)
          .send(exampleUser)
          .end((err, res) => {
            console.log(res.text);
            if (err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.text).to.be.a('string');
            done();
          });
      });
    });
  });

  describe('GET: /api/signin', function() {
    describe('with a valid body', function() {
      before(done => {
        let user = new User(exampleUser);
        user.generatePasswordHash(exampleUser.password)
          .then(user => user.save())
          .then(user => {
            this.tempUser = user;
            done();
          });
      });
      it('should return a token', done => {
        request.get(`${url}/api/signin`)
          .auth('exampleuser', '1234')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });

      it('should return a 500 error', done =>{ //we deleted it!
        request.get(`${url}/api/signin`)
          .auth('exampleuser', '1234')
          .end((err, res) => {
            expect(res.status).to.equal(500);
            done();
          });
      });
    });

    describe('with an invalid password', function(){
      before(done => {
        let user = new User(exampleUser);
        user.generatePasswordHash(exampleUser.password)
          .then(user => user.save())
          .then(user => {
            this.tempUser = user;
            done();
          });
      });
      it('should return a 401', done => {
        request.get(`${url}/api/signin`)
          .auth('exampleuser', '134')//bad password
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
      });
    });
  });
});
