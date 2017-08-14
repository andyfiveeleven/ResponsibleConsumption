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
            console.log('a different res body', res.body);
            expect(res.status).to.equal(200);
            done();
          });
      });
    });

    describe('with a valid dosage', function(){
      before(done => {
        let user = new User(exampleUser);
        user.generateDose();
        user.generatePasswordHash(exampleUser.password)
          .then(user => user.save())
          .then(user => {
            this.tempUser = user;
            done();
          });
      });
      it('Is it generateDose', function(){
        request.get(`${url}/api/signin`)
        .auth('exampleuser', '1234')
        .end((err, res) => {
          console.log('res body', res.body);
          expect(res.body.dosage).to.be.a('number');
          expect(res.body.dosage).to.equal(3);
        });
      });
    });
  });
});
