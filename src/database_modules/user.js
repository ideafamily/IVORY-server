/*jshint esnext: true */

/*npm package*/
import mongoose         from 'mongoose';
import bcrypt           from 'bcrypt-nodejs';
//  Libraries


var userSchema = mongoose.Schema({
  local            : {
    email        : String,
    password     : String,
    name         : String,
    photo        : String
  },
  facebook         : {
    id           : String,
    email        : String,
    name         : String,
    photo        : String
  },
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
