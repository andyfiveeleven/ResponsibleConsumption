'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('credibleEdibles:comment-router');
const Edible = require('../model/edible.js');
const Comment = require('../model/comment.js');
const User = require('../model/user.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const commentRouter = module.exports = new Router();


commentRouter.post('/api/edible/:edibleID/:userID/comment', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST: /api/edible/:edibleID/comment');
  let commentRating = Comment.generateOverAllRating(req.body)

  console.log('%%%%%%%%%%%%%%%', commentRating);
  Edible.findByIdAndAddComment(req.params.edibleID, commentRating)
  .then( comment => {
    console.log('-____comment____-', comment);
    return comment
  })
  .then((comment) => {
    User.findByIdAndAddComment(req.params.userID, comment)
    .then( comment => {
      res.json(comment);
    })
    .catch(next);
  })
})

commentRouter.get('/api/comment/:id', bearerAuth, function(req, res, next) {
  debug('GET: /api/comment/:id');

  Comment.findById(req.params.id)
  .then( comment => {
    res.json(comment);
  })
  .catch(next);
});

commentRouter.put('/api/comment/:id', bearerAuth, jsonParser, function(req, res, next) {
  debug(' PUT: /api/expReview/:id');

  Comment.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then( comment => {
    return res.json(comment);
  })
  .catch(next);
});

commentRouter.delete('/api/comment/:id', bearerAuth, function(req, res, next) {
  debug('DELETE: /api/comment/:id');

  Comment.findById(req.params.id)
  .then((comment) => {
    Edible.findByIdAndRemoveComment(comment.edibleID, req.params.id)
    return comment
  })
  .then((comment) => User.findByIdAndRemoveComment(comment.userid, req.params.id))
  .then(() => Comment.findByIdAndRemove(req.params.id))
  .then(() => res.status(204).send())
  .catch(next);
});
