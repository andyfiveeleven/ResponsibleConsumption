'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('../model/comment.js');
const createError = require('http-errors');
const debug = require('debug')('credibleEdibles:edibleSchema');

const edibleSchema = Schema ({
  name: {type: String, required: true, unique: true},
  ucpc: {type: String},
  link: {type: String},
  qr: {type: String},
  barcode: {type: String},
  url: {type: String},
  image: {type: String},
  producer: {
    name: {type: String},
    ucpc: {type: String},
    link: {type: String}
  },
  type: {type: String},
  strain: {type: Array},
  labTest: {type: Boolean},
  thc: {type: String},
  cbd: {type: String},
  cannabis: {type: Boolean},
  hashOil: {type: Boolean},
  reviews: {
    count: {type: Number},
    link: {type: String}
  },
  comments: [{type: Schema.Types.ObjectId, ref: 'comment'}],
  createdDate: {type: Date, Default: new Date() }
});

const Edible = module.exports = mongoose.model('edibles', edibleSchema);

Edible.findByIdAndAddComment = function(id, comment){
  debug('findByIdAndAddComment');

  return Edible.findById(id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( edible => {
    comment.edibleID = edible._id;
    this.tempEdible = edible;
    return new Comment(comment).save();
  })
  .then( comment => {
    this.tempEdible.comments.push(comment._id);
    this.tempComment = comment;
    return this.tempEdible.save();
  })
  .then( () => {
    return this.tempComment;
  });
};

Edible.findByIdAndRemoveComment = function(id, commentID) {
  debug('findByIdAndRemoveComment');

  Edible.findById(id)
  .then( edible => {
    for(let i = 0; i < edible.comments.length; i++) {
      if(commentID.toString() == edible.comments[i].toString()){
        edible.comments = edible.comments.slice(i, -1);


        return Edible.findByIdAndUpdate(Edible._id, {edible}, {new: true});
      }
    }
  });
  // .then(edible => {return edible;});

};
