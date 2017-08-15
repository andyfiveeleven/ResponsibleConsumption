// 'use strict';
//
// const expect = require('chai').expect;
// const request = require('superagent');
// const User = require('../model/user.js');
//
//
//
// const url = `http://localhost:${process.env.PORT}`;
//
// const exampleUser = {
//   username: 'exampleuser',
//   password: '1234',
//   email: 'exampleuser@test.com'
// };
//
// describe('Auth Routes', function() {
//   describe('POST: /api/signup', function() {
//     describe('with a valid body', function() {
//       after( done => {
//         User.remove({})
//         .then( () => done())
//         .catch(done);
//       });
//
//       it('should return a token', done => {
//         request.post(`${url}/api/signup`)
//         .send(exampleUser)
//         .end((err, res) => {
//           if (err) return done(err);
//           expect(res.status).to.equal(200);
//           expect(res.text).to.be.a('string');
//           done();
//         });
//       });
//     });
//   });
//   describe('POST: /api/signup', function() {
//     describe('with an invalid body', function() {
//       after( done => {
//         User.remove({})
//         .then( () => done())
//         .catch(done);
//       });
//
//       it('should return status 400', done => {
//         request.post(`${url}/api/signup`)
//         .send()
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           done();
//         });
//       });
//     });
//   });
//
//   describe('GET: /api/signin', function() {
//     describe('with a valid body', function() {
//       before( done => {
//         let user = new User(exampleUser);
//         user.generatePasswordHash(exampleUser.password)
//         .then( user => user.save())
//         .then( user => {
//           this.tempUser = user;
//           done();
//         });
//       });
//
//       after( done => {
//         User.remove({})
//         .then( () => done())
//         .catch(done);
//       });
//
//       it('should return a token 200', done => {
//         request.get(`${url}/api/signin`)
//         .auth('exampleuser', '1234')
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           done();
//         });
//       });
//     });
//   });
//
//   describe('GET: /api/sign', function() {
//     describe('with a valid body but invalid path', function() {
//       it('should return status 404', done => {
//         request.get(`${url}/api/sign`)
//         .auth('exampleuser', '1234')
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           done();
//         });
//       });
//     });
//   });
//
//   // Problem area
//   describe('cannot be authenticated', function() {
//     beforeEach( done => {
//       let user = new User(exampleUser);
//
//       user.generatePasswordHash(exampleUser.password)
//       .then( user => user.save())
//       .then( user => {
//         this.tempUser = user;
//         done();
//       })
//       .catch(done);
//     });
//
//     afterEach( done => {
//       User.remove({})
//       .then( () => done())
//       .catch(done);
//     });
//     it('should return status 401 with no username', done => {
//       request.get(`${url}/api/signin`)
//       .auth('', '1234')
//       .end((err, res) => {
//         expect(res.status).to.equal(401);
//         done();
//       });
//     });
//     it('should return status 401 with no password', done => {
//       request.get(`${url}/api/signin`)
//       .auth('exampleuser', '')
//       .end((err, res) => {
//         expect(res.status).to.equal(401);
//         done();
//       });
//     });
//     it('msg should return invalid password', done => {
//       request.get(`${url}/api/signin`)
//       .auth('exampleuser', 'ABCDE')
//       .end((err, res) => {
//         expect(res.status).equal(401);
//         done();
//       });
//     });
//     it('msg should return invalid username', done => {
//       request.get(`${url}/api/signin`)
//       .auth('dog', '1234')
//       .end((err, res) => {
//         expect(res.status).equal(401);
//         done();
//       });
//     });
//   });
// });
