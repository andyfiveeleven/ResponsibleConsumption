'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const debug = require('debug')('credibleEdibles:store');

const storeSchema = Schema({
  storename: {type: String, required: true},
  location: {type: String, required: true},
  products: {type: Array, required: true}
});

debug('storeSchema');
module.exports = mongoose.model('store', storeSchema);
