/*jshint esnext: true */

import mongoose         from 'mongoose';

var messageSchema = mongoose.Schema({
  userid       : String,
  takerid      : String,
  message      : String,
  url          : String,
  date         : Date
});

module.exports = mongoose.model('Message', messageSchema);
