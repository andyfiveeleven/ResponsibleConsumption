'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('medable:edible-route');


const Edible = require('../model/edible.js');

const edibleRouter = module.exports = new Router();


edibleRouter.post('/api/edible', jsonParser, function(req, res, next){
  debug('POST: /api/edible');
  console.log('THIS IS IN THE POST ROUTE', req.body);
  new Edible(req.body).save()
  .then( edible => res.json(edible))
  .catch(next);
});
