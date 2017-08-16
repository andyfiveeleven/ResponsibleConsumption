'use strict'

const expect = require('chai').expect
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');

const User = require('../model/user.js');
const Profile = require('../model/profile.js');
const ExpReview = require('../model/exp-review.js');

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
  experience: 2,
};

const exampleExpReview = {
  edibleName: 'zootDrops',
  lastMeal: 2
};

describe('expReview Routes', function(){
  afterEach( done => {
    Promise.all([
      User.remove({}),
      Profile.remove({}),
      ExpReview.remove({})
    ])
    .then(() => done())
    .catch(done);
  });

  describe('POST: /api/expReview', ()=> {
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

    before( done => {
      exampleProfile.userID = this.tempUser._id;
      new Profile(exampleProfile).save()
      .then( profile => {
        this.tempProfile = profile;
        done();
      })
      .catch(done);
    });

    it('should return a expReview 200', done => {
      exampleExpReview.profileID = this.tempProfile._id;
      request.post(`${url}/api/expReview`)
      .send(exampleExpReview)
      .set({
        Authorization: `Bearer ${this.tempToken}`
      })
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res.body.lastMeal).to.equal(2);
        expect(res.body.dosage).to.equal(2);
        done();
      });
    });
  });

  describe('POST with an invalid request', ()=> {
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

    before( done => {
      exampleProfile.userID = this.tempUser._id;
      new Profile(exampleProfile).save()
      .then( profile => {
        this.tempProfile = profile;
        done();
      })
      .catch(done);
    });
    it('should return a 400', done => {
      request.post(`${url}/api/expReview`)
      .send()
      .set({
        Authorization: `Bearer ${this.tempToken}`
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('POST without a token 401', () => {
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

    before( done => {
      exampleProfile.userID = this.tempUser._id;
      new Profile(exampleProfile).save()
      .then( profile => {
        this.tempProfile = profile;
        done();
      })
      .catch(done);
    });
    it('should return a 401', done => {
      request.post(`${url}/api/expReview`)
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
    });
  });
});
