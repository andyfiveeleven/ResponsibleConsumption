// 'use strict';
//
// const expect = require('chai').expect;
// const request = require('superagent');
// const Promise = require('bluebird');
// const mongoose = require('mongoose');
//
// const User = require('../model/user.js');
// const Profile = require('../model/profile.js');
// const ExpReview = require('../model/exp-review.js');
// const Edible = require('../model/edible.js');
//
// require('../server.js');
//
// const url = `http://localhost:${process.env.PORT}`;
//
// const exampleUser = {
//   username: 'exampleuser',
//   password: '1234',
//   email: 'exampleuser@test.com'
// };
//
// const exampleProfile = {
//   firstname: 'example',
//   lastname: 'user',
//   productHistory: ['zootDrops', 'GoodShipSnickerdoodle'],
//   weight: 2,
//   experience: 3,
// };
//
// const exampleExpReview = {
//   edibleName: 'testName',
//   lastMeal: 2,
// };
//
// const testEdible = {
//   name: 'testName',
//   ucpc: '0000',
//   link: 'www.alink.com',
//   qr: 'www.qr.com',
//   barcode: 'www.barcode.com',
//   url: 'www.url.com',
//   image: 'www.image.com',
//   producer: {
//     name: 'producerName',
//     ucpc: '0000',
//     link: 'www.prolink.com'
//   },
//   type: 'testType',
//   strain: [],
//   labTest: true,
//   thc: '100mg',
//   cbd: '3mg',
//   cannabis: true,
//   hashOil: false,
//   reviews: {
//     count: 0,
//     link: 'www.somelink.com'
//   },
// };
//
// describe('expReview Routes', function(){
//   afterEach( done => {
//     Promise.all([
//       User.remove({}),
//       Profile.remove({}),
//       ExpReview.remove({}),
//       Edible.remove({ name: 'testName'})
//     ])
//     .then(() => done())
//     .catch(done);
//   });
//
//   describe('POST: /api/expReview', ()=> {
//     before( done => {
//       new User(exampleUser)
//       .generatePasswordHash(exampleUser.password)
//       .then( user => user.save())
//       .then( user => {
//         this.tempUser = user;
//         return user.generateToken();
//       })
//       .then( token => {
//         this.tempToken = token;
//         done();
//       })
//       .catch(done);
//     });
//
//     before( done => {
//       exampleProfile.userID = this.tempUser._id;
//       new Profile(exampleProfile).save()
//       .then( profile => {
//         this.tempProfile = profile;
//         done();
//       })
//       .catch(done);
//     });
//
//     before( done => {
//       exampleProfile.userID = this.tempUser._id;
//       new Edible(testEdible).save()
//       .then( edible => {
//         this.tempEdible = edible;
//         done();
//       })
//       .catch(done);
//     });
//
//     it('should return a expReview', done => {
//       exampleExpReview.profileID = this.tempProfile._id;
//       request.post(`${url}/api/expReview`)
//       .send(exampleExpReview)
//       .set({
//         Authorization: `Bearer ${this.tempToken}`
//       })
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.body.lastMeal).to.equal(2);
//         expect(res.body.edibleThc).to.equal(100);
//         done();
//       });
//     });
//   });
// });
//
//
//
// describe('expReview Routes', function(){
//   describe('GET: /api/expReview', ()=> {
//     before( done => {
//       new User(exampleUser)
//       .generatePasswordHash(exampleUser.password)
//       .then( user => user.save())
//       .then( user => {
//         this.tempUser = user;
//         return user.generateToken();
//       })
//       .then( token => {
//         this.tempToken = token;
//         done();
//       })
//       .catch(done);
//     });
//
//     before( done => {
//       exampleProfile.userID = this.tempUser._id;
//       new Profile(exampleProfile).save()
//       .then( profile => {
//         this.tempProfile = profile;
//         done();
//       })
//       .catch(done);
//     });
//
//     before( done => {
//       new Edible(testEdible).save()
//       .then( edible => {
//         this.tempEdible = edible;
//         done();
//       })
//       .catch(done);
//     });
//
//     before( done => {
//       exampleExpReview.profileID = this.tempProfile._id;
//       request.post(`${url}/api/expReview`)
//       .send(exampleExpReview)
//       .set({
//         Authorization: `Bearer ${this.tempToken}`
//       })
//       .then((res) => {
//         console.log('%%%%%%%%%%%%',res.body);
//         this.tempExpReview = res.body;
//         done();
//       })
//       .catch(done);
//     });
//
//     after( done => {
//       Promise.all([
//         User.remove({}),
//         Profile.remove({}),
//         ExpReview.remove({}),
//         Edible.remove({ name: 'testName'})
//       ])
//       .then(() => done())
//       .catch(done);
//     });
//
//     it('should return a expReview', done => {
//       request.get(`${url}/api/expReview/${this.tempExpReview._id}`)
//       .set({
//         Authorization: `Bearer ${this.tempToken}`
//       })
//       .end((err, res) => {
//         console.log('HELLO', res.body);
//         if (err) return done(err);
//         expect(res.body.lastMeal).to.equal(2);
//         expect(res.body.edibleThc).to.equal(100);
//         done();
//       });
//     });
//   });
// });
