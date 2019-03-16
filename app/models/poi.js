'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Boom = require('boom');

const poiSchema = new Schema({
  poi: String,
  name: String,
  rating: Number,
  description: String,
  long: Number,
  lat: Number,
  image64: String,
  updated: { type: Date, default: Date.now },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

})

module.exports = Mongoose.model('Poi', poiSchema);