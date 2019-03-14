'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Boom = require('boom');

const poiSchema = new Schema({
  poitype: String,
  method: String,
  poiname: String,
  rating: Number,
  description: String,
  long: Number,
  lat: Number,
  updated: { type: Date, default: Date.now },
  donor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

})

module.exports = Mongoose.model('poi', poiSchema);