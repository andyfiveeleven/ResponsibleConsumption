'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('credibleEdibles:exp-review-router');
const User = require('../model/user.js');
const ExpReview = require('../model/exp-review.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
//random comment biottttttttch
const expReviewRouter = module.exports = Router();

expReviewRouter.post('/api/expReview', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST: /api/expReview');
  console.log('REQBODY', req.body);
  User.findByIdAndAddExpReview(req.user._id, req.body)
  .then( expReview => {

    return expReview.generateDose(req.user._id)
  })
  .then( expReview => {
    console.log('EXPREVIEWSHHSHSHSHSHSH', expReview);
    return expReview.findEdibleThc()
  })
  .then(expReview => {
    res.json(expReview);
  })
  .catch(next);
});

expReviewRouter.get('/api/expReview/me', bearerAuth, function(req, res, next) {
 debug('GET: /api/expReview/me');

 ExpReview.find({userID: req.user._id})
 .then( expReviews => {
   return res.json(expReviews);
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
