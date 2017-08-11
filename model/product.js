'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const debug = require('debug')('credibleEdibles:product');

const productSchema = Schema({
  productname: {type: String, required: true},
  dose: {type: Number, required: true},
  strength: {type: Number, required: true},
  userhistory: {type: Array, required: true}
});

debug('productSchema');
module.exports = mongoose.model('product', productSchema);
