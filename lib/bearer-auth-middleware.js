'use strict';

const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const debug = require('debug')('credibleEdibles:bearerAuth');

const User = require('../model/user.js');

module.exports = (req, res, next) => {
  debug('bearer auth');
  console.log('DECODEDTOKEN');
  console.log('HEADeRs',req.headers);

  let authHeader = req.headers.authorization;
  if(!authHeader) return next(createError(401, 'authorization header required'));
  console.log('AUTHHEADER', authHeader);

  let token = authHeader.split('Bearer ')[1];
  console.log('TOKEN', token);
  if(!token) return next(createError(401, 'token required'));

  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    if(err) console.error(err);
    if(err) return next(err);

    User.findOne({ findHash: decoded.token })
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => next(createError(401, err.message)));
  });
};
