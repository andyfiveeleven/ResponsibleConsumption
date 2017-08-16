'use strict';

const expect = require('chai').expect;
const request = require('superagent');

const User = require('../model/user.js');

const url = `http://localhost:${process.env.PORT}`;
require('../server.js');

const exampleUser = {username: 'exampleuser', password: '1234', email: 'exampleuser@test.com'};
const newUser = {username: 'newuser', password: '4321', email: 'newuser@test.com'};

describe('Auth Routes', () => {
  describe('invalid paths', () => {
    describe('POST: with invalid route', () => {
      it('should return status: 404, msg: Not Found', (done) => {
        request.post(`${url}/api/signup/not/a/path`)
        .send(exampleUser)
        .end((err) => {
          expect(err.status).to.equal(404);
          expect(err.message).to.equal('Not Found');
          done();
        });
      });
    });

    describe('GET: with invalid route', () => {
      it('should return status: 404, msg: Not Found', (done) => {
        request.get(`${url}/api/signin/not/a/path`)
        .auth(exampleUser.username, exampleUser.password)
        .end((err) => {
          expect(err.status).to.equal(404);
          expect(err.message).to.equal('Not Found');
          done();
        });
      });
    });
  });

  describe('POST: /api/signup', () => {
    afterEach((done) => {
      User.remove({})
        .then(() => done())
        .catch(done);
    });
    describe('with valid body', () => {
      it('should return a status of 200 and a token', (done) => {
        request.post(`${url}/api/signup`)
        .send(exampleUser)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.text).to.be.a('string');
          expect(res.body.username).to.equal(exampleUser.username);
          expect(res.body.email).to.equal(exampleUser.email);
          done();
        });
      });
    });

    describe('with invalid body', () => {
      it('should return an error status of 400', (done) => {
        request.post(`${url}/api/signup`)
        .send()
        .end((err, res) => {
          console.log(res.text);
          console.log(res.body);
          expect(err.status).to.equal(400);
          done();
        });
      });
    });
  });


  describe('GET: /api/signin', function(){
    afterEach((done) => {
      User.remove({})
        .then(() => done())
        .catch(done);
    });
    beforeEach((done) => {
      let user = new User(exampleUser);
      user.generatePasswordHash(exampleUser.password)
      .then((user) => user.save())
      .then((user) => {
        this.tempUser = user;
        done();
      })
      .catch(done);
    });

    describe('with valid body', () => {
      it('should return a status of 200 and a token', (done) => {
        request.get(`${url}/api/signin`)
        .auth(exampleUser.username, exampleUser.password)
        .end((err, res) => {
          if(err) return done(err);
          console.log(res.body);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.username).to.equal(this.tempUser.username);
          expect(res.body.email).to.equal(this.tempUser.email);
          done();
        });
      });
    });

    describe('cannot be authenticated', () => {
      it('should return status: 401, msg: username required', (done) => {
        request.get(`${url}/api/signin`)
        .auth('', exampleUser.password)
        .end((err, res) => {
          expect(err.status).to.equal(401);
          expect(res.text).to.equal('username required');
          done();
        });
      });
      it('should return status: 401, msg: password required', (done) => {
        request.get(`${url}/api/signin`)
        .auth(exampleUser.username, '')
        .end((err, res) => {
          expect(err.status).to.equal(401);
          expect(res.text).to.equal('password required');
          done();
        });
      });
      it('should return status: 401, msg: unauthorized', (done) => {
        request.get(`${url}/api/signin`)
        .auth(exampleUser.username, 'bad password')
        .end((err, res) => {
          expect(err.status).to.equal(401);
          expect(res.text).to.equal('unauthorized');
          done();
        });
      });
      it('should return status: 401, msg: invalid username', (done) => {
        request.get(`${url}/api/signin`)
        .auth('bad username', exampleUser.password)
        .end((err, res) => {
          expect(err.status).to.equal(401);
          expect(res.text).to.equal('invalid username');
          done();
        });
      });
    });
  });


  describe('GET: /api/allaccounts', function(){
    describe('with valid input', () => {
      after((done) => {
        User.remove({})
          .then(() => done())
          .catch(done);
      });
      before((done) => {
        new User(exampleUser).save()
        .then((user) => {
          this.tempUser = user;
          user.generateToken()
          .then((token) => this.tempToken = token)
          .then(() => new User(newUser).save())
          .then((testUser) => {
            this.testUser = testUser;
            testUser.generateToken()
            .then((token) => {
              this.testToken = token;
              done();
            });
          });
        })
        .catch(done);
      });
      it('should return an array of users', (done) => {
        request.get(`${url}/api/allaccounts`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.include('exampleuser');
          expect(res.body).to.include('newuser');
          done();
        });
      });
    });
  });

  describe('PUT: /api/editaccount/:id', function(){
    afterEach((done) => {
      User.remove({})
        .then(() => done())
        .catch(done);
    });
    beforeEach((done) => {
      let user = new User(exampleUser);
      user.generatePasswordHash(exampleUser.password)
      .then((user) => user.save())
      .then((user) => {
        this.tempUser = user;
        done();
      })
      .catch(done);
    });

    describe('with valid id and body', () => {
      it('should return an updated token', (done) => {
        request.put(`${url}/api/editaccount/${this.tempUser._id}`)
        .send(newUser)
        .auth(exampleUser.username, exampleUser.password)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(newUser.username);
          expect(res.body.email).to.equal(newUser.email);
          done();
        });
      });
    });

    describe('with invalid id and valid body', () => {
      it('should return status: 404, msg: not found', (done) => {
        request.put(`${url}/api/editaccount/badId`)
        .send(newUser)
        .auth(exampleUser.username, exampleUser.password)
        .end((err) => {
          expect(err.status).to.equal(404);
          expect(err.message).to.equal('Not Found');
          done();
        });
      });
    });

    describe('with valid id and invalid body', () => {
      it('should return status: 404, msg: not found', (done) => {
        request.put(`${url}/api/editaccount/badId`)
        .auth(exampleUser.username, exampleUser.password)
        .end((err) => {
          expect(err.status).to.equal(404);
          expect(err.message).to.equal('Not Found');
          done();
        });
      });
    });
  });


  describe('DELETE: /api/deleteaccount', () => {
    afterEach((done) => {
      User.remove({})
        .then(() => done())
        .catch(done);
    });
    beforeEach((done) => {
      let user = new User(exampleUser);
      user.generatePasswordHash(exampleUser.password)
      .then((user) => user.save())
      .then((user) => {
        this.tempUser = user;
        done();
      })
      .catch(done);
    });

    describe('with valid id', () => {
      it('should delete a token', (done) => {
        request.delete(`${url}/api/deleteaccount/${this.tempUser._id}`)
        .auth(exampleUser.username, exampleUser.password)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });

    describe('with invalid id', () => {
      it('should delete a token', (done) => {
        request.delete(`${url}/api/deleteaccount/invalidId`)
        .auth(exampleUser.username, exampleUser.password)
        .end((err) => {
          expect(err.status).to.equal(404);
          expect(err.message).to.equal('Not Found');
          done();
        });
      });
    });
  });
});






// 'use strict';
//
// const expect = require('chai').expect;
// const request = require('superagent');
// const mongoose = require('mongoose');
// // const Promise = require('bluebird');
// const User = require('../model/user.js');
//
// require('../server.js');
//
// const url = `http://localhost:${process.env.PORT}`;
//
// const exampleUser = {
//   username: 'exampleuser',
//   password: '1234',
//   weight: 2,
//   lastMeal: 5,
//   experience: 3,
//   email: 'exampleuser@test.com'
// };
//
// describe('Auth Routes', function() {
//   afterEach(done => {
//     User.remove({})
//       .then(() => done())
//       .catch(done);
//   });
//   describe('POST: /api/signup', function() {
//     describe('with a valid body', function() {
//       it('should return a token', done => {
//         request.post(`${url}/api/signup`)
//           .send(exampleUser)
//           .end((err, res) => {
//             console.log(res.text);
//             if (err) return done(err);
//             expect(res.status).to.equal(200);
//             expect(res.text).to.be.a('string');
//             done();
//           });
//       });
//     });
//   });
//   describe('GET: /api/signin', function() {
//     describe('with a valid body', function() {
//       before(done => {
//         let user = new User(exampleUser);
//         user.generatePasswordHash(exampleUser.password)
//           .then(user => user.save())
//           .then(user => {
//             this.tempUser = user;
//             done();
//           });
//       });
//       it('should return a token', done => {
//         request.get(`${url}/api/signin`)
//           .auth('exampleuser', '1234')
//           .end((err, res) => {
//             console.log('a different res body', res.body);
//             expect(res.status).to.equal(200);
//             done();
//           });
//       });
//
//       it('should return a 401 error', done =>{ //we deleted it!
//         request.get(`${url}/api/signin`)
//           .auth('exampleuser', '1234')
//           .end((err, res) => {
//             expect(res.status).to.equal(401);
//             done();
//           });
//       });
//     });
//
//     describe('with an invalid password', function(){
//       before(done => {
//         let user = new User(exampleUser);
//         user.generatePasswordHash(exampleUser.password)
//           .then(user => user.save())
//           .then(user => {
//             this.tempUser = user;
//             done();
//           });
//       });
//       it('should return a 401', done => {
//         request.get(`${url}/api/signin`)
//           .auth('exampleuser', '134')//bad password
//           .end((err, res) => {
//             expect(res.status).to.equal(401);
//             done();
//           });
//       });
//     });
//   });
// });
