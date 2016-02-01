/*jshint esnext: true */

import mongoose         from 'mongoose';

var roomSchema = mongoose.Schema({
  userid : String,
  self   : String,
  group  : [String]
});

module.exports = mongoose.model('Room',roomSchema);
