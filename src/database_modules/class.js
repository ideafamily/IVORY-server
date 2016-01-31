var mongoose = require('mongoose');

var classSchema = mongoose.Schema({
  CourseId : String,
  Number   : Number,
  Title    : String,
  Abbreviation : String
});

module.exports = mongoose.model('Class', classSchema);
