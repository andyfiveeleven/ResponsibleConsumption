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
  console.log('yes');

  if(!req.body.password) return next(createError(400, 'password required'));
  if(!req.body.username) return next(createError(400, 'username required'));
  if(!req.body.email) return next(createError(400, 'email required'));
  console.log('yes');

  let password = req.body.password;
  delete req.body.password;

  let user = new User(req.body);

  user.generatePasswordHash(password)
  .then((user) => user.save())
  .then((user) => user.generateToken())
  .then((token) => {
    console.log(token);
    // res.body = token;
    res.json(token);
  })
  .catch(next);
});

authRouter.get('/api/signin', basicAuth, function(req, res, next){
  debug('GET: /api/signin');
  console.log('yes');

  if(!req.username) next(createError(400, 'username required'));
  if(!req.password) next(createError(400, 'password required'));
  console.log('yes');

  User.findOne({username: req.auth.username})
  .then((user) => {
    if(!user) return Promise.reject(createError(401, 'invalid username'));
    return user.comparePasswordHash(req.auth.password);
  })
  .then((user) => {
    console.log(user);
    user.generateToken();
  })
  .then((token) => {
    console.log(token);
    // res.body = token;
    res.json(token);
  })
  .catch(next);
});
