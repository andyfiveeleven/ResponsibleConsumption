'use strict';

const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('credibleEdibles:auth-route');

const basicAuth = require('../lib/basic-auth-middleware.js');
const User = require('../model/user.js');

const authRouter = module.exports = Router();

authRouter.post('/api/signup', jsonParser, (req, res, next) => {
  debug('POST: /api/signup');

  let password = req.body.password;
  delete req.body.password;

  let user = new User(req.body);

  user.generatePasswordHash(password)
  .then((user) => user.save())
  .then((user) => {
    res.json(user);
    user.generateToken();
  })
  .then((token) => res.json(token))
  .catch(next);
});

authRouter.get('/api/signin', basicAuth, (req, res, next) => {
  debug('GET: /api/signin');

  User.findOne({username: req.auth.username})
  .populate('comments')
  .then((user) => {
    console.log('____USER_POP____', user);
    if(!user) return Promise.reject(createError(401, 'invalid username'));
    return user.comparePasswordHash(req.auth.password);
  })
  .then((user) => {
    res.json(user);
    user.generateToken();
  })
  .then((token) => res.json(token))
  .catch(next);
});

authRouter.get('/api/allaccounts', (req, res, next) => {
  debug('GET: /api/allaccounts');

  User.find({})
  .then((all) => {
    let tempArr = [];
    all.forEach((ele) => tempArr.push(ele.username));
    res.json(tempArr);
  })
  .catch(next);
});

authRouter.put('/api/editaccount/:id', basicAuth, jsonParser, (req, res, next) => {
  debug('/api/editaccount/:id');

  User.findById(req.params.id)
  .then((user) => {
    if(!user) return Promise.reject(createError(404, 'not found'));
  })
  .then(() => {
    User.findOneAndUpdate(req.params.id, req.body, {new: true})
    .then((token) => res.json(token));
  })
  .catch(next);
});

authRouter.delete('/api/deleteaccount/:id', basicAuth, (req, res, next) => {
  debug('/api/deleteaccount/:id');

  User.findById(req.params.id)
  .then((user) => {
    if(!user) return Promise.reject(createError(404, 'not found'));
  })
  .then(() => {
    User.deleteOne(req.params.id)
    .then((token) => res.json(token));
  })
  .catch(next);
});
