'use strict'

const expect = require('chai').expect
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');

const User = require('../model/user.js');
const Profile = require('../model/profile.js');

require('../server.js');

const url = `http://localhost:${process.env.PORT}`;

const exampleUser = {
  username: 'exampleuser',
  password: '1234',
  email: 'exampleuser@test.com'
};

const exampleProfile = {
  firstname: 'example',
  lastname: 'user',
  productHistory: ['zootDrops', 'GoodShipSnickerdoodle'],
  weight: 2,
  lastMeal: 5,
  experience: 3
};

describe('profile routes', function () {
  afterEach( done => {
    Promise.all([
      User.remove({}),
      Profile.remove({})
    ])
    .then( () => done())
    .catch(done);
  });

  describe('POST: /api/profile', ()=> {
    before( done => {
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
      .then( user => user.save())
      .then( user => {
        this.tempUser = user;
        return user.generateToken();
      })
      .then( token => {
        this.tempToken = token;
        done();
      })
      .catch(done);
    });

    it('should return a profile', done => {
      request.post(`${url}/api/profile`)
      .send(exampleProfile)
      .set({
        Authorization: `Bearer ${this.tempToken}`
      })
      .end((err, res) => {
        console.log('dosage', res.body.dosage);
        if (err) return done(err);
        expect(res.body.name).to.equal(exampleProfile.name);
        expect(res.body.dosage).to.be.a('number');
        expect(res.body.dosage).to.equal(3);
        done();
      });
    });
  });
});
