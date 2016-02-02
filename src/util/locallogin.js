/*jshint esnext: true */

import local                 from 'passport-local';

import appsingleton          from './appsingleton';

var sharedInstance = appsingleton.getInstance();
var localStrategy = local.Strategy;

function locallogin(){
  sharedInstance.passport.use('register',new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    //passReqToCallback: true,
    session: false
  },function (email, password, done) {
    sharedInstance.dbmodules.user.find({$or : [{ 'local.email' :  email},
    {'facebook.email': email}]},function(err,thisuser) {
        if(err){
          return done(err);
        }
        if(thisuser[0]){
          return done(null,false,{message : 'used email'});
        }else {
          var newUser = (sharedInstance.dbmodules.user)();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.save(function(err) {
            if(err){
              return done(err);
            }
            return done(null,newUser);
          });
        }
    });
  }));

  sharedInstance.passport.use('login',new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    //passReqToCallback: true,
    session: false
  },function (email, password, done) {
    sharedInstance.dbmodules.user.findOne({'local.email' :  email},function(err,user) {
      if(err){
        return done(err);
      }
      if(!user){
        return done(null,false,{message : 'no such user'});
      }
      if(!user.validPassword(password)){
        return done(null,false,{message : 'wrong password'});
      }
      return done(null,user);
    });
  }));
}

module.exports = locallogin;
