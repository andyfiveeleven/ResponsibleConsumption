'use strict';

const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const debug = require('debug')('credibleEdibles:auth-router');

const basicAuth = require('../lib/basic-auth-middleware.js');
const User = require('../model/user.js');

const fetchRouter = module.exports = Router();

fetchRouter.get('/api/fatchuser', basicAuth, function(req, res, next) {
  debug('GET: /api/fetchuser');
});
