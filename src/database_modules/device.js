/*jshint esnext: true */

import mongoose         from 'mongoose';

var deviceSchema = mongoose.Schema({
  userid       : String,
  socket_token : [String],
  android      : [String],
  iOS          : [String]
});

module.exports = mongoose.model('Device', deviceSchema);
