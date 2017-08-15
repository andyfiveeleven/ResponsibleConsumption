// 'use strict'
//
// const expect = require('chai').expect
// const request = require('superagent');
// const Promise = require('bluebird');
// const mongoose = require('mongoose');
//
// const User = require('../model/user.js');
// const Profile = require('../model/profile.js');
// const ExpReview = require('../model/exp-review.js');
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
//   experience: 3
// };
//
// const exampleExpReview = {
//   edibleName: 'zootDrops',
//   lastMeal: 2
// };
//
// describe('expReview Routes', function(){
//   afterEach( done => {
//     Promise.all([
//       User.remove({}),
//       Profile.remove({}),
//       ExpReview.remove({})
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
//       new Profile(exampleProfile)
//       .set({
//         Authorization: `Bearer ${this.tempToken}`
//       })
//       .then( profile => profile.save())
//       .then( profile => {
//         this.tempProfile = profile;
//       })
//       .catch(done);
//     });
//
//     it('should return a expReview', done => {
//       request.post(`${url}/api/expReview`)
//       .send(exampleExpReview)
//       .end((err, res) => {
//         if (err) return done(err);
//         console.log('res body', res.body);
//       });
//     });
//   });
// });
