/*jshint esnext: true */

/*npm package*/
import mongoose         from 'mongoose';

//  Libraries


var userSchema = mongoose.Schema({
  local            : {
    email        : String,
    password     : String,
  },
  facebook         : {
    id           : String,
    email        : String,
    name         : String,
    photo        : String
  },
});
module.exports = mongoose.model('User', userSchema);
