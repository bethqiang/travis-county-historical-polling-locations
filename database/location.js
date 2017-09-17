const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
  year: { type: Number, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  neighborhood: { type: String },
  neighborhoodSpanish: { type: String },
  precincts: { type: String },
  megaSite: { type: Boolean, required: true },
  earlyVoting: { type: Boolean, required: true },
  electionDayVoting: { type: Boolean, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
