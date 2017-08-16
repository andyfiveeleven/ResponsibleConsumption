'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('credibleEdibles:exp-review-router');

const Profile = require('../model/profile.js');
const ExpReview = require('../model/exp-review.js')
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const expReviewRouter = module.exports = Router();

expReviewRouter.post('/api/expReview', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST: /api/expReview');

  new ExpReview(req.body).save()
  .then( expReview => expReview.generateDose())
  .then( expReview => {
    res.json(expReview);
  })
  .catch(next);
});

expReviewRouter.get('api/expReview/:id', bearerAuth, function(req, res, next) {
  debug('GET: /api/expReview/:id');

  ExpReview.findById(req.params.id)
  .then( expReview => {
    res.json(expReview);
  })
  .catch(next);
});
