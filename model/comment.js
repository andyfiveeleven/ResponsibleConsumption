'use strict';

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Edible = require('../model/edible.js');
const Comment = require('../model/comment.js');
const debug = require('debug')('credibleEdibles:commentSchema');

const edibleCommentSchema = Schema ({
  edibleName: {type: String, required: true},
  edibleID: {type: Schema.Types.ObjectId },
  expId: [{type: Schema.Types.ObjectId, ref: 'expReviews'}],
  title: {type: String, required: true},
  commentBody: {type: String, required: true},
  datePosted: {type: Date, default: new Date()},

  effectRelaxed: {type: Number, max: 10},
  effectHappy: {type: Number, max: 10},
  effectEuphoric: {type: Number, max: 10},
  effectUplifted: {type: Number, max: 10},
  effectCreative: {type: Number, max: 10},

  medicalStress: {type: Number, max: 10},
  medicalDepression: {type: Number, max: 10},
  medicalPain: {type: Number, max: 10},
  medicalHeadaches: {type: Number, max: 10},
  medicalInsomnia: {type: Number, max: 10},

  negativeDryMouth: {type: Number, max: 10},
  negativeDryEyes: {type: Number, max: 10},
  negativeParanoid: {type: Number, max: 10},
  negativeDizzy: {type: Number, max: 10},
  negativeAnxious: {type: Number, max: 10},
});


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


module.exports = mongoose.model('comments', edibleCommentSchema);
