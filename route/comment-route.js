'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('credibleEdibles:comment-router');
const Edible = require('../model/edible.js');
const Comment = require('../model/comment.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const commentRouter = module.exports = new Router();


commentRouter.post('/api/edible/:edibleID/comment', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST: /api/edible/:edibleID/comment');

  Edible.findByIdAndAddComment(req.params.edibleID, req.body)
  .then( comment => {
    res.json(comment);
  })
  .catch(next);
});

commentRouter.get('/api/comment/:id', bearerAuth, function(req, res, next) {
  debug('GET: /api/comment/:id');
  console.log('hello');

  Comment.findById(req.params.id)
  .then( comment => {
    res.json(comment);
  })
  .catch(next);
});
