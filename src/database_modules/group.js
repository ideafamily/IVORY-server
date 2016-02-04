/*jshint esnext: true */

/*npm package*/
import mongoose         from 'mongoose';

var Schema = mongoose.Schema;

var groupSchema = Schema({
  groupName : String,
  courseId  : String,
  founder   : String,
  subgroup  : Number,
  member    :[{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Group',groupSchema);
