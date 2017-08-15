'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const debug = require('debug')('credibleEdibles:profile');

const profileSchema = Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},

  baseRecomendation: {type: Number, required: true},
  recomendationModifier: {type: Number, default: 0},
  productHistory: {type: Array, required: true},
  imageURI: { type: String, required: true, unique: true},
  objectKey: { type: String, required: true, unique: true},
  created: { type: Date, default: Date.now}
});


debug('profileSchema');
module.exports = mongoose.model('profile', profileSchema);
