'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('credibleEdibles:edible-router');


const Edible = require('../model/edible.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const edibleRouter = module.exports = new Router();


edibleRouter.post('/api/edible', bearerAuth, jsonParser, function(req, res, next){
  debug('POST: /api/edible');
  new Edible(req.body).save()
  .then( edible => res.json(edible))
  .catch(next);
});

edibleRouter.get('/api/edible/:id', bearerAuth, function(req, res, next) {
  debug('GET: /api/edible/:id');
  console.log('hello');

  Edible.findById(req.params.id)
  .populate('comments')
  .then( expReview => {
    res.json(expReview);
  })
  .catch(next);
});
