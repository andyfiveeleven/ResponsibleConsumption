'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('credibleEdibles:comment-router');

const Comment = require('../model/comment.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const commentRouter = module.exports = new Router();


commentRouter.post('/api/comment', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST: /api/expReview');

  new Comment(req.body).save()
  .then( comment => comment.findEdibleId())
  .then( comment => {
    res.json(comment);
  })
  .catch(next);
});

commentRouter.get('/api/comment/:id', bearerAuth, function(req, res, next) {
  debug('GET: /api/edible/:id');
  console.log('hello');

  Comment.findById(req.params.id)
  .populate('expReview')
  .then( comment => {
    res.json(comment);
  })
  .catch(next);
});
