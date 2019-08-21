const mongoose = require('mongoose');
const AbilitySchema = require('./Ability').schema;
const Schema = mongoose.Schema;

// Create Schema
const HeroSchema = new Schema({
  hero: String,
  role: String,
  abilities: [AbilitySchema]
});

module.exports = Hero = mongoose.model('hero', HeroSchema, 'cooldowns');