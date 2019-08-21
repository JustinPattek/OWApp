const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AbilitySchema = new Schema({
  name: String,   
  cooldown: Number
});

module.exports = Ability = mongoose.model('ability', AbilitySchema, 'cooldowns');