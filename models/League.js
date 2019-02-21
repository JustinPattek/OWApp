const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LeagueSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  owner: {
    type: String,
    required: true
  },
  password: {
      type: String,
      default: ''
  },
  type: {
      type: String,
      default: 'public'
  },
  capacity: Number,
  members: Array,
  date: {
      type: Date,
      default: Date.now
  }
});

module.exports = League = mongoose.model('league', LeagueSchema);