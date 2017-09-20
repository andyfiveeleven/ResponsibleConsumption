
'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');

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
        if (err) return done(err);
        expect(res.body.name).to.equal(exampleProfile.name);
        expect(res.body.weight).to.be.a('number');
        expect(res.body.weight).to.equal(2);
        done();
      });
    });
  });
  describe('POST with an invalid request', () => {
    before( done => {
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
      .then( user => {
        return user.save();
      })
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
    it('should return 400', done => {
      request.post(`${url}/api/profile`)
      .send()
      .set({
        Authorization: `Bearer ${this.tempToken}`
      })
      .end((err,res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('POST without a token 401', () => {
    before( done => {
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
      .then( user => {
        return user.save();
      })
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
    it('should return 401', done => {
      request.post(`${url}/api/profile`)
      .send()
      .end((err,res) => {
        expect(res.status).to.equal(401);
        done();
      });
    });
  });
  describe('POST with an improper route 404', () => {
    before( done => {
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
      .then( user => {
        return user.save();
      })
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
    it('should return 404', done => {
      request.post(`${url}/api/profilenew`)
      .send()
      .end((err,res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('GET: /api/profile/:id', ()=> {
    beforeEach((done) => {
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
      .then((user) => user.save())
      .then((user) => {
        this.tempUser = user;
        return user.generateToken();
      })
      .then((token) => {
        this.tempToken = token;
        done();
      })
      .catch(done);
    });

    beforeEach((done) => {
      exampleProfile.userID = this.tempUser._id;
      new Profile(exampleProfile).save()
      .then((profile) => {
        this.tempProfile = profile;
        done();
      })
      .catch(done);
    });
    describe('with valid input', () => {
      it('should get an existing profile', (done) => {
        request.get(`${url}/api/profile/${this.tempProfile._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleProfile.name);
          expect(res.body.weight).to.be.a('number');
          expect(res.body.weight).to.equal(2);
          done();
        });
      });
    });
  });
});
