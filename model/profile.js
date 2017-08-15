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
  weight: { type: Number, required: true},
  experience: {type: Number, required: true},
  userID: { type: Schema.Types.ObjectId, required: true } //mongoose makes the object id
});


debug('profileSchema');
module.exports = mongoose.model('profile', profileSchema);
