'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Edible = require('../model/edible.js');
const debug = require('debug')('credibleEdibles:expReview');

const Profile = require('../model/profile.js');

const expReviewSchema = Schema({
  edibleName: {type: String, required: true},
  lastMeal: {type: Number, required: true},
  dosage: {type: Number, default: 0},
  date: {type: Date, required: true, default: Date.now },
  dayDescription: {type: String, default: ''},
  reaction: {type: Number, max: 5, default: 3}, //1-5
  edibleThc: {type: Number},
  profileID: { type: Schema.Types.ObjectId, required: true },
  comments: [{type: Schema.Types.ObjectId, ref: 'comment'}],
});

expReviewSchema.methods.findEdibleThc = function(){
  debug('Finding Edible Thc');

  return new Promise((resolve, reject) =>{
    Edible.findOne({'name': this.edibleName})
    .then( edible => {
      let thcStr = edible.thc;
      thcStr = thcStr.slice(0, thcStr.length - 2);
      let thcInt = parseInt(thcStr);
      console.log(thcStr);
      this.edibleThc = thcInt;
      this.save();
    })
    .then(() => resolve(this))
    .catch((err) => reject(err));
  });
};

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
