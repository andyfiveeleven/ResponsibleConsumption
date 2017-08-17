'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const debug = require('debug')('credibleEdibles:expReview');

const Profile = require('../model/profile.js');

const expReviewSchema = Schema({
  edibleName: {type: String, required: true},
  lastMeal: {type: Number, required: true},
  dosage: {type: Number, default: 0},
  date: {type: Date, required: true, default: Date.now },
  dayDescription: {type: String, default: ''},
  reaction: {type: Number, default: 3}, //1-5
  profileID: { type: Schema.Types.ObjectId, required: true }
});

expReviewSchema.methods.generateDose = function(){
  debug('generate dosage');
  return new Promise((resolve,reject) => {//??
    Profile.findById(this.profileID)
    .then( profile => {
      this.dosage = Math.floor((profile.weight + profile.experience*10 + this.lastMeal*3)/14);
      this.save();
    })
    .then(() => resolve(this))
    .catch((err) => reject(err));
  });
};

debug('expReviewSchema');
module.exports = mongoose.model('expReview', expReviewSchema);
