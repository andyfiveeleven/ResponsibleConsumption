'use strict';

const fs = require('fs');
const path = require('path');
const del = require('del');
const AWS = require('aws-sdk');
const multer = require('multer');
const Router = require('express').Router;
const createError = require('http-errors');

const Profile = require('../model/profile.js');
const Avatar = require('../model/avatar.js');
const bearerAuth = require('../bearer-auth-middleware.js');
AWS.config.setPromisesDependency(require('bluebird'));

const s3 = new AWS.S3();
const dataDir = `${__dirname}/../data`;
const upload = multer({ dest: dataDir });

const picRouter = module.exports = Router();

function s3uploadProm(params) {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, s3data) => {
      resolve(s3data);
    });
  });
}

picRouter.post('/api/profile/:_id/pic', bearerAuth, upload.single('image'), function(req, res, next) {
  console.log('POST: /api/profile/:_id/pic');

  if (!req.file) {
    return next(createError(400, 'file not found'));
  }

  if (!req.file.path) {
    return next(createError(500, 'file not saved'));
  }

  let ext = path.extname(req.file.originalname);

  let params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET,
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path)
  }

  Profile.findById(req.params._id)
  .then( () => s3uploadProm(params))
  .then( s3data => {
    console.log('s3data:', s3data);
    del([`${dataDir}/*`]);
    let picData = {
      name: req.body.name,
      objectKey: s3data.Key,
      imageURI: s3data.Location,
      userID: req.user._id
    }
    return new Avatar(picData).save();
  })
  .then( pic => res.json(pic))
  .catch( err => next(err));
});
