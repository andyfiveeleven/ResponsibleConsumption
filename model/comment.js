'use strict';

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Edible = require('../model/edible.js');
const debug = require('debug')('credibleEdibles:commentSchema');

const edibleCommentSchema = Schema ({
  edibleName: {type: String, required: true},
  edibleID: {type: Schema.Types.ObjectId },
  expId: [{type: Schema.types.ObjectId, ref: 'expReview'}],
  title: {type: String, required: true},
  commentBody: {type: String, required: true},
  datePosted: {type: Date, default: new Date()},

  overallEffectsRating: {type: Number, max: 10},
  effectRelaxed: {type: Number, max: 10},
  effectHappy: {type: Number, max: 10},
  effectEuphoric: {type: Number, max: 10},
  effectUplifted: {type: Number, max: 10},
  effectCreative: {type: Number, max: 10},

  overallMedicalRating: {type: Number, max: 10},
  medicalStress: {type: Number, max: 10},
  medicalDepression: {type: Number, max: 10},
  medicalPain: {type: Number, max: 10},
  medicalHeadaches: {type: Number, max: 10},
  medicalInsomnia: {type: Number, max: 10},

  overallNegativeRating: {type: Number, max: 10},
  negativeDryMouth: {type: Number, max: 10},
  negativeDryEyes: {type: Number, max: 10},
  negativeParanoid: {type: Number, max: 10},
  negativeDizzy: {type: Number, max: 10},
  negativeAnxious: {type: Number, max: 10},
});

module.exports = mongoose.model('comment', edibleCommentSchema);

edibleCommentSchema.methods.findEdibleId = function(){
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

edibleCommentSchema.methods.generateOverallEffectsRating = function(){
  debug('generate Overall Effects Rating');

  this.overallEffectsRating = this.effectRelaxed + this.effectHappy + this.effectEuphoric + this.effectUplifted + this.effectCreative / 5;
};

edibleCommentSchema.methods.generateOverallMedicalRating = function(){
  debug('generate Overall Medical Rating');

  this.overallMedicalRating = this.medicalStress + this.medicalDepression + this.medicalPain + this.medicalHeadaches + this.medicalInsomnia / 5;
};
