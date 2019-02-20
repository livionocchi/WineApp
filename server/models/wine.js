const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const wineSchema = new Schema({
  name: String,
  color: String,
  region: String
});

module.exports = mongoose.model('Wine', wineSchema);