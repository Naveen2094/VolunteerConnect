const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
  title: String,
  shortDesc: String,
  longDesc: String,
  image: String,
});

module.exports = mongoose.model('Program', ProgramSchema);
