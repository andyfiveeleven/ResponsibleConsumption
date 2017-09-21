'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('credibleEdibles:profile-router');

const Profile = require('../model/profile.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const profileRouter = module.exports = Router();

profileRouter.post('/api/profile', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST: /api/profile');

  req.body.userID = req.user._id;
  new Profile(req.body).save()
  .then( profile => res.json(profile))
  .catch(next);
});

profileRouter.get('/api/profile/:id', bearerAuth, function(req, res, next) {
  debug('GET: /api/profile/:id');

  Profile.findById(req.params.id)
  .then( profile => {
    res.json(profile);
  })
  .catch(next);
});

profileRouter.get('/api/profile/userID', bearerAuth, function(req, res, next){
  debug('GET /api/profile/userID')
  Profile.findOne({ userID: req.user._id})
  .then( profile => {
    res.json(profile);
  })
  .catch(next)
})

profileRouter.get('/profile/me', bearerAuth, (req, res, next) => {
  console.log('USER ID', req.user._id);
  Profile.findOne({userID: req.user._id})
  .then(profile => {
    if(!profile)
      return next(createError(404, 'NOT FOUND ERROR: profile not found'))
    res.json(profile)
  })
  .catch(next)
})
