'use strict';

const jsonParser = require('body-parser').json();
const debug = require('debug')('userex:auth-router');
const Router = require('express').Router;
const basicAuth = require('../lib/basic-auth-middleware.js');
const User = require('../model/user.js');

const bearerAuth = require('../lib/bearer-auth-middleware.js');

const authRouter = module.exports = Router();
authRouter.post('/api/signup', jsonParser, function(req, res, next) {
  debug('POST: /api/signup');

  let password = req.body.password;
  delete req.body.password;

  let user = new User(req.body);

  user.generatePasswordHash(password)
    .then(user => user.save())
    .then(user => user.generateToken())
    .then(token => res.send(token))
    .catch(next);
});

// authRouter.put('/api/signup/:id', bearerAuth, function(req, res, next){
//   debug('get: /api/signup/:id');
//
//   User.findById(req.params.id)
//   .then();
// })
