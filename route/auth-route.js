'use strict';

const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('credibleEdibles:auth-route');

const basicAuth = require('../lib/basic-auth-middleware.js');
const User = require('../model/user.js');

const authRouter = module.exports = Router();

authRouter.post('/api/signup', jsonParser, function (req, res, next) {
  debug('POST: /api/signup');

  if(!req.body.password) return next(createError(400, 'password required'));
  if(!req.body.username) return next(createError(400, 'username required'));
  if(!req.body.email) return next(createError(400, 'email required'));

  let password = req.body.password;
  delete req.body.password;

  let user = new User(req.body);

  user.generatePasswordHash(password)
  .then((user) => user.save())
  .then((user) => user.generateToken())
  .then((token) => res.send(token))
  .catch(next);
});

authRouter.get('/api/signin', basicAuth, function(req, res, next){
  debug('GET: /api/signin');

  if(!req.username) return next(createError(400, 'username required'));
  if(!req.password) return next(createError(400, 'password required'));

  User.findOne({username: req.auth.username})
  .then((user) => {
    if(!user) return Promise.reject(createError(401, 'invalid username'));
    return user.comparePasswordHash(req.auth.password);
  })
  .then((user) => user.generateToken())
  .then((token) => res.send(token))
  .catch(next);
});
