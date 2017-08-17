const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');

const User = require('../model/user.js');
const Profile = require('../model/profile.js');
const ExpReview = require('../model/exp-review.js');
const Edible = require('../model/edible.js');
const Comment = require('../model/comment.js');


const url = `http://localhost:${process.env.PORT}`;
require('../server.js');

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
  experience: 3,
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

const exampleComment = {
  edibleName: 'testName',
  title: 'testTitle',
  commentBody: 'it was good',
  effectRelaxed: 1,
  effectHappy: 1,
  effectEuphoric: 1,
  effectUplifted: 1,
  effectCreative: 1,
  medicalStress: 2,
  medicalDepression: 2,
  medicalPain: 2,
  medicalHeadaches: 2,
  medicalInsomnia: 2,
  negativeDryMouth: 3,
  negativeDryEyes: 3,
  negativeParanoid: 3,
  negativeDizzy: 3,
  negativeAnxious: 3,
};

const newComment = {
  edibleName: 'newName',
  title: 'newTitle',
  commentBody: 'it was new',
  effectRelaxed: 2,
  effectHappy: 2,
  effectEuphoric: 1,
  effectUplifted: 1,
  effectCreative: 1,
  medicalStress: 2,
  medicalDepression: 2,
  medicalPain: 2,
  medicalHeadaches: 2,
  medicalInsomnia: 2,
  negativeDryMouth: 3,
  negativeDryEyes: 3,
  negativeParanoid: 3,
  negativeDizzy: 3,
  negativeAnxious: 3,
};

describe('comment Routes', function(){
  afterEach( done => {
    Promise.all([
      User.remove({}),
      Profile.remove({}),
      ExpReview.remove({}),
      Comment.remove({}),
      Edible.remove({ name: 'testName'})
    ])
    .then(() => done())
    .catch(done);
  });

  describe('POST: /api/edible/:edibleID/comment', ()=> {
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

    before( done => {
      exampleExpReview.profileID = this.tempProfile._id;
      request.post(`${url}/api/expReview`)
      .send(exampleExpReview)
      .set({
        Authorization: `Bearer ${this.tempToken}`
      })
      .then((res) => {
        this.tempExpReview = res.body;
        done();
      })
      .catch(done);
    });

    it('should return a comment', done => {
      request.post(`${url}/api/edible/${this.tempEdible._id}/comment`)
      .send(exampleComment)
      .set({
        Authorization: `Bearer ${this.tempToken}`
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.edibleName).to.equal('testName');
        done();
      });
    });
  });
  describe('GET: /api/expReview/:id', ()=> {
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

    before( done => {
      exampleExpReview.profileID = this.tempProfile._id;
      request.post(`${url}/api/expReview`)
      .send(exampleExpReview)
      .set({
        Authorization: `Bearer ${this.tempToken}`
      })
      .then((res) => {
        this.tempExpReview = res.body;
        done();
      })
      .catch(done);
    });

    before( done => {
      new Comment(exampleComment).save()
      .then( comment => {
        this.tempComment = comment;
        done();
      })
      .catch(done);
    });

    it('should return a comment', done => {
      request.get(`${url}/api/comment/${this.tempComment._id}`)
      .send(exampleComment)
      .set({
        Authorization: `Bearer ${this.tempToken}`
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.edibleName).to.equal('testName');
        done();
      });
    });
  });

  describe('PUT /api/comment/:id', () =>{
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

    before( done => {
      exampleExpReview.profileID = this.tempProfile._id;
      request.post(`${url}/api/expReview`)
      .send(exampleExpReview)
      .set({
        Authorization: `Bearer ${this.tempToken}`
      })
      .then((res) => {
        this.tempExpReview = res.body;
        done();
      })
      .catch(done);
    });

    before( done => {
      new Comment(exampleComment).save()
      .then( comment => {
        this.tempComment = comment;
        done();
      })
      .catch(done);
    });

    it('PUT Should respond with a 200 and updated coment.', done => {
      request.put(`${url}/api/comment/${this.tempComment._id}`)
      .set({
        Authorization: `Bearer ${this.tempToken}`
      })
      .send(newComment)
      .end( (err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal(newComment.name);
        done();
      });
    });
  });
});
