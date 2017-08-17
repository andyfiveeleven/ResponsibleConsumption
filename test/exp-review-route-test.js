'use strict';

const expect = require('chai').expect
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');

const User = require('../model/user.js');
const Profile = require('../model/profile.js');
const ExpReview = require('../model/exp-review.js');
const Edible = require('../model/edible.js');

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
  edibleName: 'testName',
  lastMeal: 2,
};

const testEdible = {
  name: 'testName',
  ucpc: '0000',
  link: 'www.alink.com',
  qr: 'www.qr.com',
  barcode: 'www.barcode.com',
  url: 'www.url.com',
  image: 'www.image.com',
  producer: {
    name: 'producerName',
    ucpc: '0000',
    link: 'www.prolink.com'
  },
  type: 'testType',
  strain: [],
  labTest: true,
  thc: '100mg',
  cbd: '3mg',
  cannabis: true,
  hashOil: false,
  reviews: {
    count: 0,
    link: 'www.somelink.com'
  },
};

const newExpReview = {
  edibleName: 'new edible',
  lastMeal: 5
};

describe('expReview Routes', function(){
  afterEach( done => {
    Promise.all([
      User.remove({}),
      Profile.remove({}),
      ExpReview.remove({}),
      Edible.remove({ name: 'testName'})
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

    before( done => {
      exampleProfile.userID = this.tempUser._id;
      new Edible(testEdible).save()
      .then( edible => {
        this.tempEdible = edible;
        done();
      })
      .catch(done);
    });

    it('should return a expReview', done => {
      exampleExpReview.profileID = this.tempProfile._id;
      request.post(`${url}/api/expReview`)
      .send(exampleExpReview)
      .set({
        Authorization: `Bearer ${this.tempToken}`
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.lastMeal).to.equal(2);
        expect(res.body.edibleThc).to.equal(100);
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

  describe('GET: /api/expReview/:id', () => {
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

    before( done => {
      exampleExpReview.profileID = this.tempProfile._id.toString();
      new ExpReview(exampleExpReview).save()
      .then( expReview => {
        this.tempExpReview = expReview;
        done();
      })
      .catch(done);
    });

    it('GET should return a expReview 200', done => {
      request.get(`${url}/api/expReview/${this.tempExpReview._id}`)
      .set({
        Authorization: `Bearer ${this.tempToken}`
      })
      .end( (err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.edibleName).to.equal(exampleExpReview.edibleName);
        expect(res.body.lastMeal).to.equal(2);
        done();
      });
    });

    describe('GET with an invalid request 404', () => {
      it('should return a 404', done => {
        request.get(`${url}/api.brewery/1234567890`)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end( (err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    describe('GET with no token should be 401', () => {
      it('should return 401', done => {
        request.get(`${url}/api.brewery/1234567890`)
        .end( (err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('PUT /api/expReview/:id', ()=>{
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

    before( done => {
      exampleExpReview.profileID = this.tempProfile._id.toString();
      new ExpReview(exampleExpReview).save()
      .then( expReview => {
        this.tempExpReview = expReview;
        done();
      })
      .catch(done);
    });

    it('PUT Should respond with a 200 and updated object', done => {
      request.put(`${url}/api/expReview/${this.tempExpReview._id}`)
      .set({
        Authorization: `Bearer ${this.tempToken}`
      })
      .send(newExpReview)
      .end( (err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.edibleName).to.equal('new edible');
        expect(res.body.lastMeal).to.equal(5);
        done();
      });
    });

    it('should respond with a 404', () => {
      request.put(`${url}/api/expReview/123456789`)
      .set({
        Authorization: `Bearer ${this.tempToken}`
      })
      .send(newExpReview)
      .end( (err,res) => {
        expect(res.status).to.equal(404);
      });
    });
  });

  describe('DELETE: /api/expReview/:id', () => {
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

    before( done => {
      exampleExpReview.profileID = this.tempProfile._id.toString();
      new ExpReview(exampleExpReview).save()
      .then( expReview => {
        this.tempExpReview = expReview;
        done();
      })
      .catch(done);
    });

    it('delete should delete a expReview and 204', done => {
      request.delete(`${url}/api/expReview/${this.tempExpReview._id}`)
      .set({
        Authorization: `Bearer ${this.tempToken}`
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(204);
        done();
      });
    });
  });
});
