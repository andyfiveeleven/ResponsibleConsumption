'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Edible = require('../model/edible.js');
const debug = require('debug')('credibleEdibles:commentSchema');

const edibleCommentSchema = Schema ({
  edibleName: {type: String, required: true},
  edibleID: {type: Schema.Types.ObjectId },
  userid: {type: Schema.Types.ObjectId},
  title: {type: String, required: true},
  commentBody: {type: String, required: true},
  datePosted: {type: Date, default: new Date()},

  overAllRating: {type: Number, max: 5},

  effectRelaxed: {type: Number, max: 5},
  effectHappy: {type: Number, max: 5},
  effectEuphoric: {type: Number, max: 5},
  effectUplifted: {type: Number, max: 5},
  effectCreative: {type: Number, max: 5},

  medicalStress: {type: Number, max: 5},
  medicalDepression: {type: Number, max: 5},
  medicalPain: {type: Number, max: 5},
  medicalHeadaches: {type: Number, max: 5},
  medicalInsomnia: {type: Number, max: 5},

  negativeDryMouth: {type: Number, max: 5},
  negativeDryEyes: {type: Number, max: 5},
  negativeParanoid: {type: Number, max: 5},
  negativeDizzy: {type: Number, max: 5},
  negativeAnxious: {type: Number, max: 5},
});

const Comment = module.exports = mongoose.model('comment', edibleCommentSchema);

Comment.generateOverAllRating = function(comment){
  debug('generate overAllRating');
  let effect = comment.effectCreative + comment.effectHappy + comment.effectUplifted + comment.effectEuphoric + comment.effectRelaxed;
  let medical = comment.medicalStress + comment.medicalDepression + comment.medicalPain + comment.medicalHeadaches + comment.medicalInsomnia;
  let negative = comment.negativeDryMouth + comment.negativeDryEyes + comment.negativeParanoid + comment.negativeDizzy + comment.negativeAnxious;
  comment.overAllRating = Math.floor((effect + medical - negative)/10)
  console.log('NEWGENCOMMENT', comment);
  return comment;
};


Comment.findEdibleId = function(){
  debug('Finding Edible Id');

  return new Promise((resolve, reject) =>{
    Edible.findOne({'name': this.edibleName})
    .then( edible => {
      this.edibleID = edible._id;
      this.save();
    })
    .then(() => resolve(this))
    .catch((err) => reject(err));
  });
};
