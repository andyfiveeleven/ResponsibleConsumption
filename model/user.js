'use strict';

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const debug = require('debug')('credibleEdibles:user');


const userSchema = Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  findHash: { type: String, unique: true },
  comments: [{type: Schema.Types.ObjectId, ref: 'comment'}],
});

userSchema.methods.generatePasswordHash = function(password){
  debug('generatePasswordHash');
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if(err) return reject(err);
      this.password = hash;
      resolve(this);
    });
  });
};

userSchema.methods.comparePasswordHash = function(password){
  debug('comparePasswordHash');

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if (err) return reject(err);
      if (!valid) return reject(createError(401, 'unauthorized'));
      resolve(this);
    });
  });
};

userSchema.methods.generateFindHash = function(){
  debug('generateFindHash');

  return new Promise((resolve, reject) => {
    this.findHash = crypto.randomBytes(32).toString('hex');
    this.save()
    .then(() => resolve(this.findHash))
    .catch((err) => reject(err));
  });
};

userSchema.methods.generateToken = function(){
  debug('generateToken');

  return new Promise((resolve, reject) => {
    this.generateFindHash()
    .then((findHash) => resolve(jwt.sign({token: findHash}, process.env.APP_SECRET)))
    .catch((err) => reject(err));
  });
};

debug('userSchema');
const User = module.exports = mongoose.model('users', userSchema);

User.findByIdAndAddComment = function(id, comment){
  debug('findByIdAndAddComment');

  return User.findById(id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( user => {
    comment.userid = user._id;
    this.tempUser = user;
    return comment.save()
  })
  .then( comment => {
    this.tempUser.comments.push(comment._id);
    this.tempComment = comment;
    console.log('____TEMP_COMMENT____', this.tempComment);
    console.log('____TEMP_USER____', this.tempUser);
    return this.tempUser.save();
  })
  .then( () => {
    return this.tempComment;
  });
};

User.findByIdAndRemoveComment = function(id, commentID) {
  debug('findByIdAndRemoveComment');

  User.findById(id)
  .then( user => {
    console.log(user);
    for(let i = 0; i < user.comments.length; i++) {
      if(commentID.toString() == user.comments[i].toString()){
        user.comments = user.comments.slice(i, -1);


        return User.findByIdAndUpdate(User._id, {user}, {new: true});
      }
    }
  });
};
