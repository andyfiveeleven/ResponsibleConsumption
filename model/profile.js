'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const debug = require('debug')('credibleEdibles:profile');

const profileSchema = Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  productHistory: {type: Array, required: true},
  weight: { type: Number, required: true},
  lastMeal: {type: Number, required: true},
  experience: {type: Number, required: true},
  dosage: {type: Number, default: 0},
  userID: { type: Schema.Types.ObjectId, required: true } //mongoose makes the object id
});

profileSchema.methods.generateDose = function(){
  debug('generate dosage');

  return new Promise((resolve,reject) => {
    this.dosage = Math.floor((this.weight + this.experience*10 + this.lastMeal*3)/14);
    console.log('a dosage', this.dosage);
    this.save()
    .then(() => resolve(this))
    .catch((err) => reject(err));
  });
};

debug('profileSchema');
module.exports = mongoose.model('profile', profileSchema);
