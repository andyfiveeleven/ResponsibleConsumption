'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('credibleEdibles:exp-review-router');

const ExpReview = require('../model/exp-review.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const expReviewRouter = module.exports = Router();

expReviewRouter.post('/api/user/:userID/expReview', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST: /api/user/:userID/expReview');

  Edible.findByIdAndAddExpReview(req.params.userID, req.body)
  .then( expReview => {
    return expReview
  })
  .then( expReview => expReview.generateDose())
  .then( expReview => expReview.findEdibleThc())
  .then( expReview => {
    res.json(expReview);
  })
  .catch(next);




});

expReviewRouter.get('/api/expReview/:id', bearerAuth, function(req, res, next) {
  debug('GET: /api/expReview/:id');

  ExpReview.findById(req.params.id)
  .populate('comment')
  .then( expReview => {
    return res.json(expReview);
  })
  .catch(next);
});

expReviewRouter.put('/api/expReview/:id', bearerAuth, jsonParser, function(req, res, next) {
  debug('PUT: /api/expReview/:id');

  ExpReview.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then( expReview =>{
    return res.json(expReview);
  })
  .catch(next);
});

expReviewRouter.delete('/api/expReview/:id', bearerAuth, function(req, res, next){
  debug('DELETE: /api/expReview/:id');

  ExpReview.findByIdAndRemove(req.params.id)
  .then( () => res.status(204).send())
  .catch(next);
});
