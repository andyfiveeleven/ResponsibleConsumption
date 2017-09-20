'use strict';

const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('credibleEdibles:auth-route');
const superagent = require('superagent');

const basicAuth = require('../lib/basic-auth-middleware.js');
const User = require('../model/user.js');

const authRouter = module.exports = Router();

authRouter.get('/oauth/google/code', (req, res, next) => {
  if(!req.query.code){
    res.redirect(process.env.CLIENT_URL);
  }else{
    console.log(req.body);
    superagent.post('https://www.googleapis.com/oauth2/v4/token')
    .type('form')
    .send({
      code: req.query.code,
      grant_type: 'authorization_code',
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.API_URL}/oauth/google/code`
    })
    .then(response => {
      console.log('POST: /v4/token, response.body');
      return superagent.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
      .set('authorization', `Bearer ${response.body.access_token}`)
    })
    .then(response => {
      console.log('GET: people/me', response.body)
      return User.handleOAUTH(response.body);
    })
    .then(user => user.tokenCreate())
    .then(token => {
      console.log('TOKEN', token)
      res.cookie('X-Token', token);
      res.redirect(process.env.CLIENT_URL);
    })
    .catch((error) => {
      console.error(error);
      res.redirect(process.env.CLIENT_URL);
    })
  }
})

authRouter.post('/api/signup', jsonParser, (req, res, next) => {
  debug('POST: /api/signup');

  let password = req.body.password;
  delete req.body.password;

  let user = new User(req.body);

  user.generatePasswordHash(password)
  .then((user) => user.save())
  .then((user) => user.generateToken())
  .then((token) => {
    user.findHash = token;
    res.json(user);
  })
  .catch(next);
});

authRouter.get('/api/signin', basicAuth, (req, res, next) => {
  debug('GET: /api/signin');

  User.findOne({username: req.auth.username})
  .populate('comment', 'expReview')
  .then((user) => {
    if(!user) return Promise.reject(createError(401, 'invalid username'));
    return user.comparePasswordHash(req.auth.password);
  })
  .then((user) => {
    user.generateToken()
    .then((token) => {
      user.findHash = token;
      res.json(user);
    });
  })
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
