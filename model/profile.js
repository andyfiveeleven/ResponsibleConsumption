'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const debug = require('debug')('credibleEdibles:profile');

const profileSchema = Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  producthistory: {type: Array, required: true}
});

debug('profileSchema');
module.exports = mongoose.model('profile', profileSchema);
