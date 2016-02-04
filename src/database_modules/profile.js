/*jshint esnext: true */

/*npm package*/
import mongoose         from 'mongoose';

var Schema = mongoose.Schema;

var profileSchema = mongoose.Schema({
  user        : { type: Schema.Types.ObjectId, ref: 'User' },
  name        : String,
  gender      : String,
  photo       : String,
  university  : [String],
  major       : [String],
  email       : [String]
});

module.exports = mongoose.model('Profile',profileSchema);
