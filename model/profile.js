'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const debug = require('debug')('credibleEdibles:profile');

const profileSchema = Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  productHistory: {type: Array},
  weight: { type: Number, required: true},
  experience: {type: Number, required: true},
  userID: { type: Schema.Types.ObjectId, required: true }
});


debug('profileSchema');
module.exports = mongoose.model('profile', profileSchema);
