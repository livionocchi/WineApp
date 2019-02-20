const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const bottleSchema = new Schema({
  name: String,
  producer: String,
  year: String,
  grade: String,
  wineId: String
});

module.exports = mongoose.model('Bottle', bottleSchema);