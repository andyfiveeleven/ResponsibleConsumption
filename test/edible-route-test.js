// 'use strict';
//
// const expect = require('chai').expect;
// const request = require('superagent');
// const Promise = require('bluebird');
//
// const User = require('../model/user.js');
// // const Profile = require('../model/profile.js');
// const Edible = require('../model/edible.js');
//
// const url = `http://localhost:${process.env.PORT}`;
//
// require('../server.js');
//
// const exampleUser = {
//   username: 'exampleuser',
//   password: '1234',
//   email: 'exampleuser@test.com'
// };
//
// // const exampleProfile = {
// //   firstname: 'example',
// //   lastname: 'user',
// //   productHistory: ['zootDrops', 'GoodShipSnickerdoodle'],
// //   weight: 2,
// //   lastMeal: 5,
// //   experience: 3
// // };
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
// describe('edible routes', function () {
//   afterEach( done => {
//     Promise.all([
//       User.remove({}),
//       Edible.remove({ name: 'testName'})
//     ])
//     .then( () => done())
//     .catch(done);
//   });
//
//   describe('POST: /api/edible', ()=> {
//     before( done => {
//       new User(exampleUser)
//       .generatePasswordHash(exampleUser.password)
//       .then( user => {
//         return user.save();
//       })
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
//     it('should return an edible', done => {
//       request.post(`${url}/api/edible`)
//       .send(testEdible)
//       .set({
//         Authorization: `Bearer ${this.tempToken}`
//       })
//       .end((err, res) => {
//         console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', res.body.strain);
//         if (err) return done(err);
//         expect(res.status).to.equal(200);
//         expect(res.body.name).to.equal('testName');
//         expect(res.body.ucpc).to.equal('0000');
//         expect(res.body.link).to.equal('www.alink.com');
//         expect(res.body.qr).to.equal('www.qr.com');
//         expect(res.body.barcode).to.equal('www.barcode.com');
//         expect(res.body.url).to.equal('www.url.com');
//         expect(res.body.image).to.equal('www.image.com');
//         expect(res.body.producer.name).to.equal('producerName');
//         expect(res.body.producer.ucpc).to.equal('0000');
//         expect(res.body.producer.link).to.equal('www.prolink.com');
//         expect(res.body.type).to.equal('testType');
//         expect(res.body.strain).to.be.an('array');
//         expect(res.body.labTest).to.equal(true);
//         expect(res.body.thc).to.equal('100mg');
//         expect(res.body.cbd).to.equal('3mg');
//         expect(res.body.cannabis).to.equal(true);
//         expect(res.body.hashOil).to.equal(false);
//         expect(res.body.reviews.count).to.equal(0);
//         expect(res.body.reviews.link).to.equal('www.somelink.com');
//         done();
//       });
//     });
//   });
//   describe('POST with an invalid request', () => {
//     before( done => {
//       new User(exampleUser)
//       .generatePasswordHash(exampleUser.password)
//       .then( user => {
//         return user.save();
//       })
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
//     it('should return 400', done => {
//       request.post(`${url}/api/edible`)
//       .send()
//       .set({
//         Authorization: `Bearer ${this.tempToken}`
//       })
//       .end((err,res) => {
//         expect(res.status).to.equal(400);
//         done();
//       });
//     });
//   });
//   describe('POST without a token 401', () => {
//     before( done => {
//       new User(exampleUser)
//       .generatePasswordHash(exampleUser.password)
//       .then( user => {
//         return user.save();
//       })
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
//     it('should return 401', done => {
//       request.post(`${url}/api/edible`)
//       .send()
//       .end((err,res) => {
//         expect(res.status).to.equal(401);
//         done();
//       });
//     });
//   });
//   describe('POST with an improper route 404', () => {
//     before( done => {
//       new User(exampleUser)
//       .generatePasswordHash(exampleUser.password)
//       .then( user => {
//         return user.save();
//       })
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
//     it('should return 404', done => {
//       request.post(`${url}/api/ediblecookie`)
//       .send()
//       .end((err,res) => {
//         expect(res.status).to.equal(404);
//         done();
//       });
//     });
//   });
// });