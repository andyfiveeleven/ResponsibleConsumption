'use strict';

const jsonParser = require('body-parser').json();
const debug = require('debug')('userex:auth-router');
const Router = require('express').Router;
const basicAuth = require('../lib/basic-auth-middleware.js');
const User = require('../model/user.js');

const fetchRouter = module.exports = Router();

fetchRouter.get('/api/fatchuser', basicAuth, function(req, res, next) {
  debug('GET: /api/fatchuser');
});