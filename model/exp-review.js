'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Edible = require('../model/edible.js');
const superagent = require('superagent')
const debug = require('debug')('credibleEdibles:expReview');

const Profile = require('../model/profile.js');

const expReviewSchema = Schema({
  edibleName: {type: String, required: true},
  lastMeal: {type: Number, required: true},
  dosage: {type: Number, default: 0},
  date: {type: Date, required: true, default: Date.now },
  description: {type: String, default: ''},
  reaction: {type: Number, max: 5, default: 3},
  edibleThc: {type: Number},
  userID: { type: Schema.Types.ObjectId, required: true },
});

expReviewSchema.methods.generateDose = function(userID){
  debug('generate dosage');

  return Profile.findOne({ userID: userID })
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( profile => {
    this.dosage = Math.floor((profile.weight + profile.experience*10 + this.lastMeal*3)/14);
    console.log('EXPREVIEW BITCHES', this);
    return this.save();
  })
  .then(expReview => {
    console.log('returning exp review ')
    return expReview;
  })
};

expReviewSchema.methods.findEdibleThc = function(expReview){
  debug('Finding Edible Thc');

  return Edible.findOne({name: this.edibleName})
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( edible => {
    let thcStr = edible.thc;
    thcStr = thcStr.slice(0, thcStr.length - 2);
    let thcInt = parseInt(thcStr);
    this.edibleThc = thcInt;
    return this.save()
  })
  .then(expReview => {
    return expReview;
  })
};



debug('expReviewSchema');
module.exports = mongoose.model('expReview', expReviewSchema);
