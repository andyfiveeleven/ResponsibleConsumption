'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const edibleSchema = Schema ({
  name: {type: String, required: true, unique: true},
  ucpc: {type: String},
  link: {type: String},
  qr: {type: String},
  barcode: {type: String},
  url: {type: String, unique: true},
  image: {type: String, unique: true},
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
  createdDate: {type: Date, Default: new Date() }
});

module.exports = mongoose.model('edible', edibleSchema);
